/* STORAGE JS */

export function setYear(element) {
    const year = new Date().getFullYear()
    element.textContent = year
} 


class Product {
    constructor(id, title, price, image, status) {
        this.id = id
        this.title = title
        this.price = price
        this.image = image
        this.status = status
    }
}


const Product1 = new Product(1, "Phone", 250, "./images/phone.jpg", "In Stock")
const Product2 = new Product(2, "Ear Pods", 100, "./images/ear-pods.jpg", "In Stock")
const Product3 = new Product(3, "Laptop", 350, "./images/laptop.jpg", "In Stock")
const Product4 = new Product(4, "Watch", 75, "./images/watch.jpg", "In Stock")
const Product5 = new Product(5, "Shoe", 50, "./images/shoes.jpg", "In Stock")
const Product6 = new Product(6, "Bag", 30, "./images/bag.jpg", "In Stock")

export const products = [Product1, Product2, Product3, Product4, Product5, Product6]

export function cartCounter(element) {
    const cart =JSON.parse(localStorage.getItem("cart")) || []

    const total = cart.reduce((sum, item) => {
        return sum + item.quantity 
    }, 0)

    element.textContent = total

    if (total > 0) {
        element.classList.add("active")
    }
    else {
        element.classList.remove("active")
    }
}
























