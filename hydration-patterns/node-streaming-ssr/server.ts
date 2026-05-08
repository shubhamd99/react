import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { createServer, type ServerResponse } from 'node:http';
import { extname, join } from 'node:path';
import { PassThrough } from 'node:stream';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from './src/App';

const port = 3003;
const clientDir = join(process.cwd(), 'dist/client');
const template = readFileSync(join(clientDir, 'index.html'), 'utf8');
const assetTags = template
  .match(/<(script|link)[^>]+\/static\/[^>]+>/g)
  ?.join('')
  .replace(/crossorigin/g, '') ?? '';

const mimeTypes: Record<string, string> = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function serveAsset(url: string, response: ServerResponse) {
  const filePath = join(clientDir, url);

  if (!existsSync(filePath)) {
    return false;
  }

  response.writeHead(200, {
    'content-type': mimeTypes[extname(filePath)] ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
  return true;
}

createServer((request, response) => {
  if (request.url && serveAsset(request.url.slice(1), response)) {
    return;
  }

  let didError = false;

  const stream = renderToPipeableStream(React.createElement(App), {
    onShellReady() {
      response.statusCode = didError ? 500 : 200;
      response.setHeader('content-type', 'text/html');
      response.write('<!doctype html><html><head><title>Node Streaming SSR</title>');
      response.write(assetTags);
      response.write('</head><body><div id="root">');

      const body = new PassThrough();
      body.pipe(response, { end: false });
      stream.pipe(body);
      body.on('end', () => {
        response.end('</div></body></html>');
      });
    },
    onError(error) {
      didError = true;
      console.error(error);
    },
  });
}).listen(port, () => {
  console.log(`Node streaming SSR running at http://localhost:${port}`);
});
