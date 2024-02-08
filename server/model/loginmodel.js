const db = require("./model");
exports.createuser = (userdeatils, callback) => {
  let Name = userdeatils.Name;
  let Email = userdeatils.Email;
  let Password = userdeatils.Password;
  let query1 = `Select * from users where Email='${Email}'`;
  db.query(query1, (err, result) => {
    if (err) {
      callback(null, err);
      return;
    }
    console.log(result);

    if (result.length > 0) {
      // console.log(result.length);
      callback({ alreadyExists: true }, null);
      return;
    }
    let query = `Insert into users(Name,Email,Password) values ("${Name}","${Email}","${Password}")`;

    db.query(query, (err) => {
      if (err) {
        // console.log(err);
        callback(null, err);
        return;
      }
      callback();
      return;
    });
  });
};
exports.LoginUser = (Logindata, callback) => {
  const { Email, Password } = Logindata;

  let query = `SELECT * FROM users WHERE Email='${Email}'`;
  db.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    if (result.length > 0) {
      console.log(result);
      if (result[0].Password === Password) {
        callback(null, { Message: "Login Successfull", ...result });
        return;
      } else {
        callback(null, { Message: "Wrong password" });
        return;
      }
    } else {
      console.log(result);
      callback(null, { Message: "Invalid UserName" });
      return;
    }
  });
};

exports.getalbums = (callback) => {
  let query = "select * from albums";
  db.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    // console.log(result);
    callback(null, result);
  });
};
