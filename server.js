const express = require("express");
const connection = require("./connection");
const controller = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", controller);


app.listen(8080, (req, res) => {
    console.log("SERVER CONNECTED");
});