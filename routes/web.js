const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");
const guest = require("../app/http/middlewares/guest");

function initRoutes(app) {
    //Home route
    app.get("/", homeController().index);

    //login route
    app.get("/login",guest, authController().login);
    app.post("/login", authController().postLogin);
    //Register route
    app.get("/registration",guest, authController().register);
    app.post("/registration", authController().postRegister);
    //logout
    app.post('/logout', function(req, res, next){
      try {
        req.logout(err => {
          if (err) {
            return next(err)
          }
          res.redirect('/')
        });
      } catch (error) {
        res.status(500).send(error.message)
      }
     
    });
      //cart route
    app.get("/cart", cartController().index);
    app.post('/update-cart', cartController().update)


}
module.exports = initRoutes;