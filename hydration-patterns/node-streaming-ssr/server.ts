import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { PassThrough } from 'node:stream';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type ReactType from 'react';
import type { renderToPipeableStream as renderToPipeableStreamType } from 'react-dom/server';
import { App } from '../react-hydration/src/App';

const app = express();
const port = 3003;
const serverDir = dirname(fileURLToPath(import.meta.url));
const clientDir = join(serverDir, '../react-hydration/dist');
const reactRequire = createRequire(join(serverDir, '../react-hydration/package.json'));
const React = reactRequire('react') as typeof ReactType;
const { renderToPipeableStream } = reactRequire('react-dom/server') as {
  renderToPipeableStream: typeof renderToPipeableStreamType;
};
const template = readFileSync(join(clientDir, 'index.html'), 'utf8');
const [htmlStart, htmlEnd] = template.split('<div id="root"></div>');

app.use('/static', express.static(join(clientDir, 'static')));
app.get('/favicon.png', (_, response) => {
  response.sendFile(join(clientDir, 'favicon.png'));
});

app.use((_, response) => {
  let didError = false;

  const stream = renderToPipeableStream(React.createElement(App), {
    onShellReady() {
      response.status(didError ? 500 : 200);
      response.setHeader('content-type', 'text/html');
      response.write(`${htmlStart}<div id="root">`);

      const body = new PassThrough();
      body.pipe(response, { end: false });
      stream.pipe(body);
      body.on('end', () => {
        response.end(`</div>${htmlEnd}`);
      });
    },
    onError(error: unknown) {
      didError = true;
      console.error(error);
    },
  });
});

app.listen(port, () => {
  console.log(`Express streaming SSR running at http://localhost:${port}`);
});
