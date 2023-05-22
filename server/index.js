const express = require("express");
require("./db/mongoose"); //mongoose.js eka import kara
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRouter = require("./routes/task");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(taskRouter);

const port = 3000;


app.listen(port, () => {
    console.log("Server is up and running on port " + port)
})



