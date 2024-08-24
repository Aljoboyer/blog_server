const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require('./src/DBconnection/DBconnect')
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

connectDB()


// route
const blogUserRoutes = require("./src/app/routes/bloguser.route");
const blogRoutes = require("./src/app/routes/blog.route");

app.use("/user", blogUserRoutes);
app.use("/blog", blogRoutes);

app.get("/", (req, res) => {
    console.log('Blog server is connected')
});
  
app.listen(port, (req, res) => {
console.log("Blog Server Port Is", port);
});
