const express = require("express");
const cookieparser = require("cookie-parser");
const routes = require("./routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieparser());
app.use(bodyParser.json());
app.use(routes);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server is listening on port 8080");
});
