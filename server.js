// server.js
const express = require('express');
const path = require("path");

const app = express();
const PORT = 4000;

app.use('/', express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
    res.setHeader('X-XSS-Protection', 1);
    res.setHeader('X-Frame-Options', 'deny');
    res.header('X-Content-Type-Options', 'nosniff')

    res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});