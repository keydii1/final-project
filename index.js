const express = require("express");
const route = require("./routes/client/index.route");
const  adminRoute = require("./routes/admin/index.route");
const app = express();
const database = require("./config/database");
require('dotenv').config();
const port = process.env.PORT;
database.connect();
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

//Routes init
adminRoute(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});