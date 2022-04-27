import express from 'express';
import fs from 'fs';
import * as path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './databaseFunctions.mjs';

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
let sets;
try {
  fs.readFile('./src/server/sets.json', 'utf8', (err, data) => {
    err ? console.warn(err) : null;
    sets = JSON.parse(data);
    data ? console.log("sets fetched") : null
  });
} catch {
  console.error("sets cannot be fetched");
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
server.post('/query_set', (req, res) => {
  querySet(req, res);
})
server.post('/query_many_sets', (req, res) => {
  queryManySets(req, res);
})

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

async function queryBrick(req, res) {

  let brickInfo = await db.queryBrick(await req.body.id)
  brickInfo = brickInfo[0];
  brickInfo.id != null ? brickInfo.type = 'brick' : null;
  res.status(200).json({
    brickInfo,
  });
}

async function queryManyBricks(req, res) {
  const brickArray = await db.queryManyBricks(await req.body);
  for (let i in brickArray){
    brickArray[i].type = 'brick';
  }
  res.status(200).json({
    brickArray,
  });
}

async function querySet(req, res) {
  let setInfo = {};
  if (req.body.id) {
    for (let i = 0; i < sets.length; i++) {
      sets[i].id == req.body.id ? setInfo = sets[i] : null;
    }
  }
  if (req.body.name) {
    for (let i = 0; i < sets.length; i++) {
      sets[i].name == req.body.name ? setInfo = sets[i] : null;
    }
  }

  res.status(200).json({
    setInfo,
  });
}

async function queryManySets(req, res) {
  let setArray = [];
  if (req.body.id) {
    for (let i = 0; i < sets.length; i++) {
      sets[i].id == req.body.id ? setArray.push(sets[i]) : null;
    }
  }
  if (req.body.colour) {
    for (let i = 0; i < sets.length; i++) {
      sets[i].name == req.body.name ? setArray.push(sets[i]) : null;
    }
  }
  if (req.body.all) {
    for (let i = 0; i < sets.length; i++) {
      setArray.push(sets[i]);
    }
  }
  res.status(200).json({
    setArray,
  });
}
