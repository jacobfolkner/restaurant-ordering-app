import { menuArray } from "./data";

const menuItems = menuArray
  .map(function (item) {
    return `<div class="menu-item" id="${item.id}">
    <p class="emoji">${item.emoji}</p>
    <div class="menu-text">
        <h3>${item.name}</h3>
        <p class="ingredients">${item.ingredients.join(", ")}</p>
        <p class="price">$${item.price}</p>
    </div>
    <button class="add-item-btn" aria-label="add item to order">+</button>
</div>`;
  })
  .join("");

document.getElementById("menu").innerHTML = menuItems;
