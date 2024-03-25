import { menuArray } from "./data";

document.addEventListener("click", function (e) {
  if (e.target.dataset.id && e.target.classList.contains("add-item-btn")) {
    handleAddItem(e.target.dataset.id);
  }
});

let total = 0;

function handleAddItem(id) {
  const item = menuArray.find((item) => item.id == id);
  document.getElementById("order-items").innerHTML += `
        <div class="order-item">
              <p class="item-name">${item.name}</p>
              <p class="item-price">$${item.price}</p>
              <p class="remove-item">(remove)</p>
        </div>`;
  total += item.price;
  document.getElementById("total-price").innerText = total;
}

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
