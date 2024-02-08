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
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
