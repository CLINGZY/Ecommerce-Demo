/* PRODUCT JS */
import { setYear, products, cartCounter } from "./utils.js";

const currentYear = document.getElementById("currentYear")
const productContainer = document.getElementById("productContainer")
const headerLinkCounter = document.getElementById("headerLinkCounter")

setYear(currentYear)

let cartItems = JSON.parse(localStorage.getItem("cart")) || []


function renderProducts () {
    productContainer.innerHTML = ""

    products.forEach((product) => {
        const productCard = document.createElement("div")
        productCard.classList.add("product-card")  

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

        productCard.innerHTML = `
        <figure class="image-figure">
            <img src="${product.image}" alt="${alt}">
        </figure>
        <p>${product.title}</p>
        <p>$${product.price}</p>
        <p class="product-in-stock">${product.status}</p>
        <button class="button product-card-button" data-id="${product.id}">Add to Cart</button>`

        const addToCart = productCard.querySelector(".product-card-button")

        addToCart.addEventListener("click", () => {
            const cardId = Number(addToCart.dataset.id)
            const clickedProduct = products.find((p) => {
                return p.id === cardId
            })

            if (!clickedProduct) return

            const addedItem = cartItems.find(c => c.product.id === cardId)

            if (addedItem) {
                addedItem.quantity ++
            }
            else {
                cartItems.push({product: clickedProduct, quantity: 1})
            }  

            localStorage.setItem("cart", JSON.stringify(cartItems))
            cartCounter(headerLinkCounter)
        })

        productContainer.appendChild(productCard)
    })
}


renderProducts()
cartCounter(headerLinkCounter)































