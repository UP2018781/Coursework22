const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
