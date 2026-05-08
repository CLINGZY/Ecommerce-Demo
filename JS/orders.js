import { setYear, cartCounter } from "./utils.js";

const currentYear = document.getElementById("currentYear")
const emptyOrders = document.getElementById("emptyOrders")
const ordersContainer = document.getElementById("ordersContainer")
const headerLinkCounter = document.getElementById("headerLinkCounter")


setYear(currentYear)

let orders = JSON.parse(localStorage.getItem("orders")) || []

function renderOrders() {
    if (orders.length === 0) {
        emptyOrders.textContent = "No Order history"
        return
    }

    ordersContainer.innerHTML = ""
    emptyOrders.textContent = ""

    orders.forEach((order) => {
        const orderCard = document.createElement("div")
        orderCard.classList.add("order-card")
        let plural = "s"
        if (order.quantity === 1) {
            plural = ""
        }

        orderCard.innerHTML = `
            <p>${order.quantity} item${plural}</p>
            <p>$${order.total}</p>
            <p>${order.date}</p>`

        ordersContainer.appendChild(orderCard)
    })
}

renderOrders()
cartCounter(headerLinkCounter)


























