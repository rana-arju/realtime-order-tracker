import axios from 'axios';
import { initAdmin } from './admin'
let addToCart = document.querySelectorAll('.add-btn');
let cartCounter = document.querySelectorAll('.cartCounter');
function updateCart(food) {
    axios.post('/update-cart', food)
    .then(res => {
        cartCounter[0].innerText= res.data.totalQty
        // Display a success toast, with a title
 
    })
    
}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
       let food = JSON.parse(btn.dataset.food);
       updateCart(food)
    })
})
// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}
initAdmin();