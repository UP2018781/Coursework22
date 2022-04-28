import express from 'express';
import fs from 'fs';
import * as path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './databaseFunctions.mjs';

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
  console.log(`bricks fetched ${brickArray.length}`);
  res.status(200).json({
    brickArray,
  });
}

async function querySet(req, res) {
  let setInfo = {};
  req.body.id > 0 ? setInfo = await db.querySet(req.body.id) : null;

  res.status(200).json({
    setInfo,
  });
}

async function queryManySets(req, res) {
  const setArray = await db.queryManySets(req.body);

  for (let i in setArray) {
    setArray[i].type = 'set';
  }

  console.log(`sets fetched: ${setArray.length}`);

  res.status(200).json({
    setArray,
  });
}
