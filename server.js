const express = require("express");
var cors = require("cors");

const app = express();

const appRoute = require("./routes/appRoute.js");

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*'
}))

app.set("view engine", "ejs");

app.use(express.json());

app.use("/", appRoute);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));