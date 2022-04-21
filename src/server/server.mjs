import express from 'express';
import fs from 'fs';
import * as path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

let bricks;
try {
  fs.readFile('./src/server/bricks.json', 'utf8', (err, data) => {
    err ? console.warn(err) : null;
    bricks = JSON.parse(data);
    data ? console.log("bricks fetched") : null
  });
} catch {
  console.error("bricks cannot be fetched");
}

const server = express();
const port = 8080;

server.use(express.static(path.join(process.cwd() + '/src/public')));
server.use(
  bodyParser.json()
);
server.use(cors());

server.post('/query_brick', (req, res) => {
  queryBrick(req, res);
});
server.post('/query_many_bricks', (req, res) => {
  queryManyBricks(req, res);
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

async function queryBrick(req, res) {

  let brickInfo = {};
  if (req.body.id) {
    for (let i = 0; i < bricks.length; i++) {
      bricks[i].id == req.body.id ? brickInfo = bricks[i] : null;
    }
  }
  if (req.body.colour) {
    for (let i = 0; i < bricks.length; i++) {
      bricks[i].colour == req.body.colour ? brickInfo = bricks[i] : null;
    }
  }

  res.status(200).json({
    brickInfo,
  });
}

async function queryManyBricks(req, res) {
  let brickArray = [];
  if (req.body.id) {
    for (let i = 0; i < bricks.length; i++) {
      bricks[i].id == req.body.id ? brickArray.push(bricks[i]) : null;
    }
  }
  if (req.body.colour) {
    for (let i = 0; i < bricks.length; i++) {
      bricks[i].colour == req.body.colour ? brickArray.push(bricks[i]) : null;
    }
  }
  if (req.body.all) {
    for (let i = 0; i < bricks.length; i++) {
      brickArray.push(bricks[i]);
    }
  }
  res.status(200).json({
    brickArray,
  });
}
