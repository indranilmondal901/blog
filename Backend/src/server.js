const express = require('express');
const cors = require("cors");
const PORT = 8080;
const app = express();

//DB connection
require("./DB/connection");

//routers
const UserRoutes = require("./Routes/user_routes");
const BlogRoutes = require("./Routes/blog_routes");

//Global error handler
const ErrorLog = require("./Controller/ErrorLog");

app.use(cors());
app.use(express.json());

app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/blog",BlogRoutes);
app.use(ErrorLog);

//listen(server)
app.listen(PORT, () => {
    console.log("Your Server is running on PORT no ==> " + PORT)
})