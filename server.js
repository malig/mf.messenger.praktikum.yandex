// server.js
const express = require('express');

const app = express();
const PORT = 4000;
const staticDir = './static';

app.use(express.static(staticDir));
app.use(express.static(`${staticDir}/auth`));
app.use(express.static(`${staticDir}/registration`));
app.use(express.static(`${staticDir}/messenger`));
app.use(express.static(`${staticDir}/profile`));
app.use(express.static(`${staticDir}/404`));
app.use(express.static(`${staticDir}/500`));
app.use(express.static(`${staticDir}/dialog`));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});