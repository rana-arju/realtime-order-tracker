const authController = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");

function initRoutes(app) {
    //Home route
    app.get("/", homeController().index);

    //cart route
    app.get("/cart", (req, res) => {
        res.render("customers/cart")
    });
    //login route
    app.get("/login", authController().login);
    //Register route
    app.get("/registration", authController().register);


}
module.exports = initRoutes;