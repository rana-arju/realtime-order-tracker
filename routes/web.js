function initRoutes(app) {
    //Home route
    app.get("/", (req, res) => {
        res.render("home")
    })
    //cart route
    app.get("/cart", (req, res) => {
        res.render("customers/cart")
    })
    //login route
    app.get("/login", (req, res) => {
        res.render("auth/login")
    })
    //Register route
    app.get("/registration", (req, res) => {
        res.render("auth/register")
    })


}
module.exports = initRoutes;