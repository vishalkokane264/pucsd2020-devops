const sql = require("./db.js");

// constructor
const User = function(user) {
    this.id=user.id
    this.name = user.name;
    this.age = user.age;
    this.department=user.department;
    this.subject=user.subject;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user_details SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("User Created: ", newUser.id);
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM user_details WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("User found: ", res[0].id);
      result(null, res[0]);
      return;
    }
    result({ kind: "User not found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM user_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Users found");
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user_details SET name = ?, age = ?, department = ?, subject = ? WHERE id = ?",
    [user.name,user.age,user.department,user.subject,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "User not found" }, null);
        return;
      }

      console.log("User updated: ",user.id);
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user_details WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "User not found" }, null);
      return;
    }

    console.log("User deleted with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM user_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Records deleted: ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = User;