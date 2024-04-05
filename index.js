// IMPORT ----------------------------------------------
import { menuArray } from "./data.js";


// ELEMENTS ----------------------------------------------
const completeOrderBtn = document.getElementById("complete-order-btn");
const checkoutModal = document.getElementById("checkout-modal");
const payBtn = document.getElementById("pay-btn");

const menuItems = menuArray
  .map(function (item) {
    return `
    <div class="menu-item" id="${item.id}" >
        <p class="emoji">${item.emoji}</p>
        <div class="menu-text">
            <h3>${item.name}</h3>
            <p class="ingredients">${item.ingredients.join(", ")}</p>
            <p class="price">$${item.price}</p>
        </div>
            <button class="add-item-btn" 
                aria-label="add item to order" 
                data-id="${item.id}">+</button>
    </div>`;
  })
  .join("");

document.getElementById("menu").innerHTML = menuItems;


// GLOBAL VARIABLES ----------------------------------------------
let total = 0;


// EVENTS ----------------------------------------------
document.addEventListener("click", function (e) {
  if (e.target.dataset.id && e.target.classList.contains("add-item-btn")) {
    handleAddItem(e.target.dataset.id);
  }
});

completeOrderBtn.addEventListener("click", openModal);

payBtn.addEventListener("click", closeModal); // Temporary: the modal can be closed by clicking payBtn



// FUNCTIONS ----------------------------------------------
function handleAddItem(id) {
  const item = menuArray.find((item) => item.id == id);
  document.getElementById("order-items").innerHTML += `
        <div class="order-item">
              <p class="item-name">${item.name}</p>
              <p class="item-price">$${item.price}</p>
              <p class="remove-item">(remove)</p>
        </div>`;
  total += item.price;
  document.getElementById("total-price").innerText = `$${total}`;
}

function openModal() {
  checkoutModal.classList.remove("hidden");
}

function closeModal() {
  checkoutModal.classList.add("hidden");
  document.getElementById("order-items").innerHTML = ``;
  total = 0;
  document.getElementById("total-price").innerText = `$${total}`;
}