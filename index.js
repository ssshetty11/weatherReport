// https://github.com/ssshetty11/weatherReport.git

const http = require('http');
const fs = require('fs');
const requests = require('requests');

// Read the HTML template file
const homeFile = fs.readFileSync('home.html', 'utf-8');

// Function to replace the placeholders with actual values
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp - 273.15).toFixed(2));
    temperature = temperature.replace("{%tempmin%}", (orgVal.main.temp_min - 273.15).toFixed(2));
    temperature = temperature.replace("{%tempmax%}", (orgVal.main.temp_max - 273.15).toFixed(2));
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    return temperature;
};

// Create a server
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=817220ded1b107a909d0fc9571a3c665")
            .on('data', (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                
                // Using reduce to process and replace data
                const realTimeData = arrData.reduce((acc, val) => acc + replaceVal(homeFile, val), "");
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(realTimeData);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});

// Start the server
server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:8000');
});
