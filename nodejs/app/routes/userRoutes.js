module.exports = app => {
    const user = require("../controllers/userControl.js");

    app.post("/user", user.create);
    app.get("/user", user.findAll);
    app.get("/user/:userId", user.findOne);
    app.put("/user/:userId", user.update);
    app.delete("/user/:userId", user.delete);
    app.delete("/user", user.deleteAll);
};
