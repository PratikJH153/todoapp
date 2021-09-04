const express = require("express");
const connection = require("./connection");
const controller = require("./routes/routes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", controller);


app.listen(process.env.PORT || 8080, (req, res) => {
    console.log("SERVER CONNECTED");
});