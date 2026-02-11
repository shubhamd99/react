const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());

// Serve static files from the React app (client/dist)
// NOTE: You must build the client first (npm run build in /client)
app.use(express.static(path.join(__dirname, '../client/dist')));

// API endpoint to demonstrate multiplexing (simulated delay)
app.get('/api/images', (req, res) => {
    const images = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        src: \`/api/image/\${i}\`,
        title: \`Image \${i}\`
    }));
    res.json(images);
});

app.get('/api/image/:id', (req, res) => {
    const id = req.params.id;
    // Simulate processing time varies
    const delay = Math.floor(Math.random() * 500) + 100;
    setTimeout(() => {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(\`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="hsl(\${id * 18}, 70%, 50%)" />
            <text x="50" y="50" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em">\${id}</text>
        </svg>\`);
    }, delay);
});

// HTTP/2 Push Example
// When requesting index.html, we push the main.js or css if available
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    
    // Check if we can push
    // Check if we can push
    if (res.push) {
        // console.log("Stream supports push"); // Optional log
        const assetsPath = path.join(__dirname, '../client/dist/assets');
        
        // Push only if assets directory exists
        if (fs.existsSync(assetsPath)) {
            fs.readdir(assetsPath, (err, files) => {
                if (err) {
                    console.error("Could not list assets for push:", err);
                    return;
                }

                files.forEach(file => {
                    if (file.endsWith('.js') || file.endsWith('.css')) {
                        const filePath = \`/assets/\${file}\`;
                        const contentType = file.endsWith('.js') ? 'application/javascript' : 'text/css';
                        
                        // console.log(\`Pushing: \${filePath}\`);
                        
                        fs.readFile(path.join(assetsPath, file), (err, data) => {
                            if (err) return;
                            
                            try {
                                const stream = res.push(filePath, {
                                    status: 200,
                                    method: 'GET',
                                    request: { accept: '*/*' },
                                    response: { 'content-type': contentType }
                                });
                                stream.on('error', () => {}); // Ignore push errors (client already has it, etc)
                                stream.end(data);
                            } catch (e) {
                                // Ignore push failures
                            }
                        });
                    }
                });
            });
        }
    }

    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send('Build the client first: npm run build in /client');
    }
});

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
};

spdy.createServer(options, app).listen(PORT, (err) => {
    if (err) {
        throw new Error(err);
    }
    console.log(\`HTTP/2 Server listening on https://localhost:\${PORT}\`);
});
