const express = require("express");
var cors = require("cors");

const app = express();

const appRoute = require("./routes/appRoute.js");

const PORT = process.env.PORT || 3000;

app.use(cors());

app.set("view engine", "ejs");

app.use(express.json());

app.use("/", appRoute);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
