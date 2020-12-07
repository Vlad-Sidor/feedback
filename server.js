const express = require("express");
var cors = require("cors");

const appRoute = require("./routes/appRoute.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.set("view engine", "ejs");

app.use(express.json());

app.use("/", appRoute);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
