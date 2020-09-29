const dotenv = require('dotenv');
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

const env = dotenv.config()
 
const line = '========================================================================='

console.info(line);
console.info('Admin server starting');

if (env.error) {
  throw env.error
}
console.info('Env config:');
console.info(env.parsed)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log(process.env.REACT_APP_SSL)
var server
if (process.env.REACT_APP_SSL === "secure") {
  console.info('Entering on secured mode')
  server = https.createServer(
    {
      key: fs.readFileSync(`../privkey.pem`),
      cert: fs.readFileSync(`../fullchain.pem`),
      requestCert: true,
      rejectUnauthorized: false
    },
    app
  )
} else {
  server = http.createServer(app)
}

server.listen({ port: 9000 }, () => {
  console.info('Server listening')
  console.info(line);
})