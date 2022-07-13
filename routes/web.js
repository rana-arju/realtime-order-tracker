const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");
const adminController = require("../app/http/controllers/admin/orderController");
const orderController = require("../app/http/controllers/customers/orderController");

//middleware
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");
const guest = require("../app/http/middlewares/guest");
const statusController = require("../app/http/controllers/admin/statusController");

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
    app.post('/update-cart', cartController().update);

    //Customer Route
    app.post('/orders', auth, orderController().store);
    app.get('/customers/orders', auth, orderController().index);
    app.get('/customers/orders/:id', auth, orderController().show);
    
    //admin Routes
    app.get('/admin/orders', auth,admin, adminController().store);

    //admin/order/status
    app.post('/admin/order/status', auth, admin, statusController().update);



}
module.exports = initRoutes;