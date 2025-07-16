import "../styles/cart.scss";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartItems,
  subscribe,
} from "./cartStore.js";
import { getWordForm } from "./cartUtils.js";
import { createCartModalHTML } from "./cartTemplate.js";

export function createCart() {
  const modal = document.createElement("div");
  modal.className = "cart-modal cart-modal--hidden";
  modal.innerHTML = createCartModalHTML();
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".cart-modal__close");
  const overlay = modal.querySelector(".cart-modal__overlay");
  const list = modal.querySelector(".cart-modal__list");
  const emptyMessage = modal.querySelector(".cart-modal__empty");
  const clearBtn = modal.querySelector(".cart-modal__clear");
  const countText = modal.querySelector(".cart-modal__count-text");
  const totalPrice = modal.querySelector(".cart-modal__total-price");
  const checkoutBtn = modal.querySelector(".cart-modal__checkout");

  const close = () => {
    modal.classList.add("cart-modal--hidden");
    modal.classList.remove("cart-modal--visible");
  };

  const open = () => {
    modal.classList.add("cart-modal--visible");
    modal.classList.remove("cart-modal--hidden");
  };

  const renderCart = () => {
    const items = getCartItems();
    list.innerHTML = "";

    if (items.length === 0) {
      emptyMessage.style.display = "block";
      list.style.display = "none";
      countText.textContent = "0 товаров";
      totalPrice.textContent = "0 $";
      return;
    }

    emptyMessage.style.display = "none";
    list.style.display = "block";

    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    countText.textContent = `${totalCount} ${getWordForm(totalCount)}`;
    totalPrice.textContent = `${totalAmount.toFixed(2)} $`;

    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-modal__item";
      itemElement.innerHTML = `
        <div class="cart-modal__item-image"><img src="${item.image}" alt="${
        item.title
      }"></div>
        <div class="cart-modal__item-info">
          <div class="cart-modal__item-main">
            <div class="cart-modal__item-title">${item.title}</div>
            <div class="cart-modal__item-price">${item.price.toFixed(2)} $</div>
          </div>
          <div class="cart-modal__item-side">
            <div class="cart-modal__item-controls">
              <button class="cart-modal__item-decrease" data-id="${
                item.id
              }">−</button>
              <span class="cart-modal__item-quantity">${item.quantity}</span>
              <button class="cart-modal__item-increase" data-id="${
                item.id
              }">+</button>
              <button class="cart-modal__item-delete" data-id="${
                item.id
              }">x</button>
            </div>
          </div>
        </div>
      `;
      list.appendChild(itemElement);
    });

    list
      .querySelectorAll(".cart-modal__item-decrease")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          removeFromCart(parseInt(btn.dataset.id))
        )
      );

    list.querySelectorAll(".cart-modal__item-increase").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = parseInt(btn.dataset.id);
        const product = getCartItems().find((item) => item.id === productId);
        if (product) addToCart(product);
      });
    });

    list
      .querySelectorAll(".cart-modal__item-delete")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          updateQuantity(parseInt(btn.dataset.id), 0)
        )
      );
  };

  clearBtn.addEventListener("click", () => clearCart());
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  checkoutBtn.addEventListener("click", () =>
    alert("Переход к оформлению заказа")
  );

  subscribe(renderCart);
  renderCart();

  return { element: modal, open, close };
}
