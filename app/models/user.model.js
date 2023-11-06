const sql = require("./db.js");
// constructor
const User = function(user) {
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.no_telp = user.no_telp;
};

User.findOne = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email LIKE '%${email}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the email
      result({ kind: "not_found" }, null);
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
};
  
User.getAll = (user, result) => {
    let query = "SELECT * FROM users";
  
    if (user) {
      query += ` WHERE name LIKE '%${user}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
};

module.exports = User;
