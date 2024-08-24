const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require('./src/DBconnection/DBconnect')

app.use(cors());
app.use(express.json());

connectDB()


// route
const blogUserRoutes = require("./src/app/routes/bloguser.route");

app.use("/user", blogUserRoutes);

app.get("/", (req, res) => {
    console.log('Blog server is connected')
});
  
app.listen(port, (req, res) => {
console.log("Blog Server Port Is", port);
});
