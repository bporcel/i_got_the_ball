const express = require("express");
const cors = require("cors");
const controller = require("./controller.js")

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(controller);

app.listen(4242, () => console.log("Node server listening on port 4242!"));
