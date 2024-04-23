import { menuArray } from "./data.js";

document.addEventListener("click", function (e) {
  if (e.target.dataset.id && e.target.classList.contains("add-item-btn")) {
    handleAddItem(e.target.dataset.id);
  }
  if (e.target.dataset.remove) {
    removeOrderItem(e.target.dataset.remove)
  }
});


let orderArray = []
let total = 0;

function handleAddItem(id) {
  // Convert menuArray object.id to number
  const idNumber = parseInt(id, 10);

  // Find the clicked menu item by id
  const selectedItem = menuArray.find(item => item.id === idNumber);

  // Check if the item is already in orderArray
  const existingItemIndex = orderArray.findIndex(item => item.id === idNumber);

  if (existingItemIndex !== -1) {
    // If item is already in orderArray, increment quantity. explanation(https://tinyurl.com/ycxp5vc9)
    orderArray[existingItemIndex].quantity = (orderArray[existingItemIndex].quantity || 1) + 1;
  } else {
    // Else, add the item to orderArray with a new orderItemID
    const newItem = { ...selectedItem, orderItemID: createOrderItemID(), quantity: 1 };
    orderArray.push(newItem);
  }

  renderOrder();
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

// Kept all the new code at the bottom so it's easy to read; can reorganize later
// Temporary: the modal can be closed by clicking payBtn
const completeOrderBtn = document.getElementById("complete-order-btn");
const checkoutModal = document.getElementById("checkout-modal");
const payBtn = document.getElementById("pay-btn");

completeOrderBtn.addEventListener("click", openModal);
payBtn.addEventListener("click", closeModal);

function openModal() {
  checkoutModal.classList.remove("hidden");
}

function closeModal() {
  checkoutModal.classList.add("hidden");
  document.getElementById("order-items").innerHTML = ``;
  total = 0;
  orderArray = [];
  document.getElementById("total-price").innerText = `$${total}`;
}

//create a unique 'order item id' to be used for removing order items
function createOrderItemID() {
  let orderLineItemNumber = 'a'
  for (let i = 0; i < 5; i++) {
    orderLineItemNumber += Math.floor( Math.random() * 9)
  }
  return orderLineItemNumber;
}

function renderOrder() {
      let orderPrice = 0

      const orderItems = orderArray.map((item) => {
        let orderQuantity = ''
        
        //build the string for quantities > 1
        if (item.quantity > 1) {
          orderQuantity = ` x ${item.quantity}`
        } else { orderQuantity = ''}
        
        orderPrice += item.price * item.quantity
       
          return `
                      <div class="order-item">
                          <p class="item-name">${item.name}</p>
                          <p class="item-price">$${item.price}${orderQuantity}</p>
                          <p class="remove-item" data-remove="${item.orderItemID}">(remove)</p> 
                      </div>
                      `
          }).join('')
      
          document.getElementById("order-items").innerHTML = `
                                  <div>
                                    ${orderItems}
                                  </div>
                              `
      total = orderPrice;
      document.getElementById("total-price").innerText = `$${total}`;
  }

  function removeOrderItem(removeOrderItemID) {
    // Find the clicked menu item by id
    const itemToRemove = orderArray.find(item => item.orderItemID === removeOrderItemID);
    
    // Decrement quantity if > 1
    if (itemToRemove.quantity > 1) {
      itemToRemove.quantity = itemToRemove.quantity -1;
    } else {
      orderArray = orderArray.filter(item => item.orderItemID != removeOrderItemID)
    }
    
    // If orderArray is empty clear out the order HTML
    if (orderArray.length === 0) {
      document.getElementById("order-items").innerHTML = '';
      document.getElementById("total-price").innerText = `$0`;
      
  } else {
      renderOrder();
  }
  
  }
