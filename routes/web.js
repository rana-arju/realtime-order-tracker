const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");

function initRoutes(app) {
    //Home route
    app.get("/", homeController().index);

    //login route
    app.get("/login", authController().login);
    app.post("/login", authController().postLogin);
    //Register route
    app.get("/registration", authController().register);
    app.post("/registration", authController().postRegister);

      //cart route
    app.get("/cart", cartController().index);
    app.post('/update-cart', cartController().update)


}
module.exports = initRoutes;