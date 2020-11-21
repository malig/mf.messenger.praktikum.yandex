// server.js
const express = require('express');

const app = express();
const PORT = 4000;
const staticDir = './static';

app.use(express.static(staticDir));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});