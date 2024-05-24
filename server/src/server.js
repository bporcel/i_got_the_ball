const express = require("express");
const cors = require("cors");
const serverless = require('serverless-http');
const controller = require("./controller.js")
const webhook = require("./webhook.js")

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use('/stripe', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use('/api/', controller);
app.use('/webhook/', webhook);

module.exports.handler = serverless(app);
