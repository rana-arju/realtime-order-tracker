import axios from 'axios';
let addToCart = document.querySelectorAll('.add-btn');
let cartCounter = document.querySelectorAll('.cartCounter');
function updateCart(food) {
    axios.post('/update-cart', food)
    .then(res => {
        cartCounter[0].innerText= res.data.totalQty,
        // Display a success toast, with a title
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Some notification text'
        
        }).show();
    })
    
}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
       let food = JSON.parse(btn.dataset.food);
       updateCart(food)
    })
})