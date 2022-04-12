const express = require('express');
const server = express();
const port = 8080;
const path = require('path');

server.use(express.static(path.join(process.cwd() + '/src/public')));

server.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() + '/src/public/index.html'));
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
