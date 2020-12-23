const path = require('path');
const express = require('express');
const helmet = require('helmet');
const app = express();
const fs = require('fs');

const reportsRoutes = require('./routes/reports');

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use((req, res, next) => {
    let filePath = path.join(__dirname, 'reports.txt');

    try {
        let rawdata = fs.readFileSync(filePath);
        req.db = JSON.parse(rawdata);
        
        next();
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
});

app.use('/', reportsRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data:data
    })
})

const server = app.listen(8080);

module.exports = server;