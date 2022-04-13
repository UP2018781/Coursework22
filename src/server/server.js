const express = require('express');
const server = express();
const port = 8080;
const path = require('path');
const cors = require('cors');

server.use(express.static(path.join(process.cwd() + '/src/public')));

server.use(cors());

server.post('/query_brick', (req, res) => {
  queryBrick(req, res);
  res.end();
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

function queryBrick(req, res) {
  res.status(200).json({
    BrickInfo: {
      id: req.body.id,
      colour: 'red',
      stockLevel: '10',
      price: 1.23,
    },
  });
  return res;
}
