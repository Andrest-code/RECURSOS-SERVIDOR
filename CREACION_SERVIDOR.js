const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const HOST = 'localhost';
const BASE_DIR = __dirname;
const server = http.createServer((req, res) => {
    let filePath = path.join(BASE_DIR, req.url === '/' ? 'index.html' : req.url);
    // Leer archivo solicitado
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Archivo no encontrado');
        } else {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'text/plain';
            switch (ext) {
                case '.html': contentType = 'text/html; charset=utf-8'; break;
                case '.css': contentType = 'text/css'; break;
                case '.js': contentType = 'application/javascript'; break;
                case '.json': contentType = 'application/json'; break;
                case '.png': contentType = 'image/png'; break;
                case '.jpg': case '.jpeg': contentType = 'image/jpeg'; break;
                case '.mp3': contentType = 'audio/mpeg'; break;
                case '.mp4': contentType = 'video/mp4'; break;
                case '.pdf': contentType = 'application/pdf'; break;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});
server.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en: http://${HOST}:${PORT}`);
    console.log(`Sirviendo archivos desde: ${BASE_DIR}`);
});
