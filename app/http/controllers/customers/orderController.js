const Order = require('../../../models/order')
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
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', "Something went Wrong")
                return res.redirect('/cart')

            })
        },
        async index(req, res){
            const orders = await Order.find({customerId: req.user._id});
            res.render('customers/orders', {orders: orders})
        }
    }
}
module.exports = orderController;