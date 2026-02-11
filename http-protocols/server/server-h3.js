/*
 * HTTP/3 (QUIC) Server Implementation
 * 
 * note: This code requires a Node.js build with QUIC support enabled.
 * Standard Node.js v18-v20 distributions do NOT include this by default yet.
 * 
 * If you have a QUIC-enabled Node build, this code demonstrates how to set it up.
 */

const fs = require('fs');
const path = require('path');
// const key = fs.readFileSync(path.join(__dirname, 'certs/key.pem'));
// const cert = fs.readFileSync(path.join(__dirname, 'certs/cert.pem'));

// Feature detection or fallback
let http3;
try {
    // Try to load the experimental quic module or an external library
    // http3 = require('http3'); // hypothetical
    console.log("Searching for HTTP/3 support...");
} catch (e) {
    console.log("Native HTTP/3 not found.");
}

/* 
 * CODE STRUCTURE FOR HTTP/3
 * 
 * If using the 'quic' library (e.g. from a custom node build):
 */

/*
const { createQuicSocket } = require('net'); // Example of where it might live in experimental builds

if (createQuicSocket) {
    const socket = createQuicSocket({ endpoint: { port: 3003 } });
    
    socket.on('session', (session) => {
        session.on('stream', (stream) => {
            stream.respond({
                ':status': 200,
                'content-type': 'text/plain'
            });
            stream.end('Hello fully over QUIC!');
        });
    });

    socket.listen({ key, cert, alpn: 'h3' }).then(() => {
        console.log('HTTP/3 QUIC server listening on port 3003');
    });
} else {
    // Alternative: Using a library like 'webtransport' or 'node-webtransport'
    console.log("----------------------------------------------------------------");
    console.log("ERROR: This Node.js version does not support QUIC/HTTP3 natively.");
    console.log("To run HTTP/3, you typically need to build Node from source with --experimental-quic");
    console.log("OR use a reverse proxy like Caddy/Nginx in front of this app.");
    console.log("----------------------------------------------------------------");
}
*/

// For the purpose of this demo, we will start a standard HTTPS server 
// and advertise HTTP/3 via Alt-Svc header, which is how browsers discover it.
// Even if the Node server itself talks H1/H2, this header tells the browser "I support H3 at this port"
// (The browser would fail to connect H3 if we don't actually listen, but this shows the mechanism).

const https = require('https');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3003;

app.use(cors());

app.use((req, res, next) => {
    // Advertise HTTP/3 availability
    // h3=":3003"; ma=86400 means "I support HTTP/3 on port 3003, remember for 1 day"
    res.setHeader('Alt-Svc', 'h3=":3003"; ma=86400, h3-29=":3003"; ma=86400');
    next();
});

app.get('/', (req, res) => {
    res.send('This server advertises HTTP/3 via Alt-Svc, but Node.js requires custom builds to actually serve it.');
});

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
};

https.createServer(options, app).listen(PORT, () => {
    console.log(\`HTTP/3 (Mock/Advertisement) Server listening on https://localhost:\${PORT}\`);
    console.log("Check headers for 'Alt-Svc: h3=...'");
});
