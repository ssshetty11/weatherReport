const http = require('http');
const fs = require('fs');
const requests = require('requests');

const homeFile = fs.readFileSync('home.html', 'utf-8');

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(homeFile);
    } else if (req.url == "/weather") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=817220ded1b107a909d0fc9571a3c665")
            .on("data", function(chunk) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(chunk);
            });
    }
});

server.listen(3003, "127.0.0.1", () => {
    console.log('Server is running on http://127.0.0.1:3003');
});
