const Order = require('../../../models/order');
const moment = require('moment');
function orderController() {
    return {
        store(req, res){

            //valided request
            const {phone, name, address} = req.body;
            if (!phone || !name || !address) {
                req.flash('error', "All Field Are Required*")
                return res.redirect('/cart')
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                name,
                phone,
                address
            })
            order.save().then(result => {
                req.flash('success', "Order Placed Successfully!")
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch(err => {
                req.flash('error', "Something went Wrong")
                return res.redirect('/cart')

            })
        },
        async index(req, res){

            const orders = await Order.find({customerId: req.user._id});
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render('customers/orders', {orders: orders, moment})
        }
    }
}
module.exports = orderController;