const express = require("express");

const appRoute = require("./routes/appRoute.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());

app.use("/", appRoute);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));