const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  //   console.log(req.body);
  const token = req.cookies.token;
  //   console.log(token);
  //   console.log(10);

  if (!token) {
    return res.status(401).send("No token");
  }

  try {
    const decoded = jwt.verify(token, process.env.Secret_key);
    const username = decoded.name;
    if (decoded.role === "admin") {
      // console.log("1");
      next();
    } else {
      return res.status(401).send("No token");
    }
    // Continue with the next middleware or route handler
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal error");
  }
};

module.exports = { verifyUser };
