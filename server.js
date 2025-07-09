// // server.js
// require('dotenv').config();

// console.log("📦 ENV Loaded:");

// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');

// const port = process.env.PORT || 3000;
// const dev = false; // production mode
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });


const express = require('express')
const next = require('next')
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 3000
const dev = false
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Serve .next and public
  server.use('/_next', express.static(path.join(__dirname, '.next')))
  server.use('/public', express.static(path.join(__dirname, 'public')))

  server.all('*', (req, res) => handle(req, res))

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
