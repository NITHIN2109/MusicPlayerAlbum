const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("No token");
  }

  try {
    const decoded = jwt.verify(token, process.env.Secret_key);
    // const username = decoded.name;
    if (decoded.role === "admin") {
      next();
    } else {
      return res.status(401).send("Not authorized");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal error");
  }
};

module.exports = { verifyUser };
