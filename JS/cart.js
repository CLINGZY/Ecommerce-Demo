/* CART JS */
import { setYear} from "./utils.js";

const currentYear = document.getElementById("currentYear")
const cartProducts = document.getElementById("cartProducts")
const cartCheckout = document.getElementById("cartCheckout")
const cartTotal = document.getElementById("cartTotal")

const emptyCartMessage = document.getElementById("emptyCartMessage")
const checkoutButton = document.getElementById("checkoutButton")

const notification = document.getElementById("notification")

const notificationMessage = document.getElementById("notificationMessage")


setYear(currentYear)

let cartItems = JSON.parse(localStorage.getItem("cart")) || []

function renderCart() {
    if (cartItems.length === 0) {
        cartProducts.innerHTML = ""
        emptyCartMessage.textContent = "Your cart is empty"
        cartTotal.textContent = ""
        checkoutButton.style.display = "none"

        return
    }

    cartProducts.innerHTML = ""

    cartItems.forEach((item) => {
        const product = item.product
        const quantity = item.quantity

        const cartCard = document.createElement("div")
        cartCard.classList.add("cart-card")


        let alt = null

        if (product.title === "Phone") {
            alt = "phone"
        } else if (product.title === "Ear Pods") {
            alt = "ear pods"
        } else if (product.title === "Laptop") {
            alt = "laptop"
        } else if (product.title === "Watch") {
            alt = "watch"
        } else if (product.title === "Shoes") {
            alt = "shoe"
        } else if (product.title === "Bag") {
            alt = "bag"
        }

        cartCard.innerHTML = `
        <div class="cart-card-first-half">
            <figure class="image-figure">
                <img src="${product.image}" alt="${alt}">
            </figure>

            <div class="cart-card-words">
                <p>${product.title}</p>
                <p>$${product.price * quantity}</p>
                <p>${product.status}</p>
            </div>
        </div>

        <div class="cart-card-second-half">
            <button class="button remove-btn" data-id="${product.id}">Remove</button>

            <div class="cart-card-second-half-add-remove-buttons">
                <button class="button increase-btn" data-id="${product.id}">+</button>
                <p>${quantity}</p>
                <button class="button decrease-btn" data-id="${product.id}">-</button>
            </div>
        </div>`

        const removeButton = cartCard.querySelector(".remove-btn")
        const addButton = cartCard.querySelector(".increase-btn")
        const decreaseButton = cartCard.querySelector(".decrease-btn")

        removeButton.addEventListener("click", () => {
            const id = Number(removeButton.dataset.id)

            cartItems = cartItems.filter((c) => {
                return c.product.id !== id
            })

            localStorage.setItem("cart", JSON.stringify(cartItems))
            renderCart()
            
        })

        addButton.addEventListener("click", () => {
            const id = Number(addButton.dataset.id)

            const clickedItem = cartItems.find((c) => {
                return c.product.id === id
            })

            if (clickedItem) {
                clickedItem.quantity ++
            }
            
            localStorage.setItem("cart", JSON.stringify(cartItems))
            renderCart()
            
        })

        decreaseButton.addEventListener("click", () => {
            const id = Number(decreaseButton.dataset.id)

            const clickedItem = cartItems.find((c) => {
                return c.product.id === id
            })

            if (clickedItem && clickedItem.quantity > 1) {
                clickedItem.quantity --
            }
            else {
                cartItems = cartItems.filter((c) => {
                return c.product.id !== id })
            }

            localStorage.setItem("cart", JSON.stringify(cartItems))
            renderCart()
            
        })

        cartProducts.appendChild(cartCard)
    })  

    getCartTotal ()
}




checkoutButton.addEventListener("click", () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || []

    const newOrder = {
        id: Date.now(),
        quantity: cartItems.reduce((sum,item) => {
            return sum + item.quantity
        }, 0),
        total: cartItems.reduce((sum,item) => {
            return sum + item.product.price * item.quantity
        }, 0),
        date: new Date().toLocaleString()
    }

    orders.push(newOrder)
    localStorage.setItem("orders", JSON.stringify(orders))
 
    cartItems = []
    localStorage.setItem("cart", JSON.stringify(cartItems))

    renderCart()
    showNotification("Order placed")

    setTimeout(() => {window.location.href = "orders.html"}, 1500)
    
})



function getCartTotal () {
    const total = cartItems.reduce((a, b) => {
        return a + (b.product.price * b.quantity)
    }, 0) 
    cartTotal.textContent = `TOTAL: $${total}`
    emptyCartMessage.textContent = ""

    checkoutButton.style.display = "inline"
}


function showNotification (message) {
    notificationMessage.textContent = message
    notification.style.display = "block"

    setTimeout(() => {
        notification.style.display = "none"
    }, 2000)
    
}


renderCart()
