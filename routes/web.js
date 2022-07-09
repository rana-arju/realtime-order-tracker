const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");

function initRoutes(app) {
    //Home route
    app.get("/", homeController().index);

    //login route
    app.get("/login", authController().login);
    //Register route
    app.get("/registration", authController().register);

      //cart route
    app.get("/cart", cartController().index);
    app.post('/update-cart', cartController().update)


}
module.exports = initRoutes;