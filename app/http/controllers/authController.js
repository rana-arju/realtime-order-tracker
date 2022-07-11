const User = require("../../models/user");
const bcrypt = require('bcrypt');
const passport = require("passport");

function authController() {
    return {
        login(req, res){
            res.render("auth/login")
        },
        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req, res){
            res.render("auth/register")
        },
        async postRegister(req, res){
            const {name, email, password} = req.body;
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required*')
                req.flash('name', name)
                req.flash('email', email)
               return res.redirect('/registration')
            }
            //Check email unique
            User.exists({email}, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already exits*')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/registration')
                }
            })
            //Hash password
            const hashPassword = await bcrypt.hash(password, 10);
            //create new user
            const user = new User({
                name,
                email,
                password: hashPassword
            })
            user.save().then((user) => {
                //after registration
                return res.redirect('/')

            }).catch((err) => {
                req.flash('error', 'something went wrong')
               return res.redirect('/registration')
            })

        },
    }
}
module.exports = authController;