// server.js
const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'static')));

app.get('*', (request, res) => {
    res.setHeader('X-XSS-Protection', 1);
    res.setHeader('X-Frame-Options', 'deny');
    res.header('X-Content-Type-Options', 'nosniff');

    res.sendFile(path.join(__dirname, 'static/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port);
