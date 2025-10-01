const express = require("express");
const route = require("./routes/client/index.route");
const  adminRoute = require("./routes/admin/index.route");
var methodOverride = require('method-override')

const app = express();
const database = require("./config/database");
require('dotenv').config();
const port = process.env.PORT;
database.connect();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

// Method override middleware
app.use(methodOverride('_method'));

// App locals vairables
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//Routes init
adminRoute(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});