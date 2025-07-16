import "../styles/cart.scss";

let cartItems = [];
const subscribers = [];

export function addToCart(product) {
  const existing = cartItems.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  notifySubscribers();
}

export function getCartItems() {
  return cartItems;
}

export function clearCart() {
  cartItems = [];
  notifySubscribers();
}

export function subscribe(callback) {
  subscribers.push(callback);
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb(cartItems));
}

export function createCart() {
  const modal = document.createElement("div");
  modal.className = "cart-modal cart-modal--hidden";
  modal.innerHTML = `
    <div class="cart-modal__overlay"></div>
    <div class="cart-modal__content">
      <div class="cart-modal__content__header">
        <div class="cart-modal__title">Корзина</div>
        <button class="cart-modal__close" aria-label="Закрыть корзину">×</button>
      </div>
      <div class="cart-modal__items">
        <div class="cart-modal__empty">Корзина пока пуста.</div>
        <button class="cart-modal__delete">Очистить список</button>
        <ul class="cart-modal__list"></ul>
      </div>
      <div class="cart-modal__order">
        <div class="cart-modal__total">
          <span class="cart-modal__total__title">Итого:</span>
          <span class="cart-modal__total__price">0 ₽</span>
        </div>
        <button class="cart-modal__order__button">Заказать</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".cart-modal__close");
  const overlay = modal.querySelector(".cart-modal__overlay");
  const list = modal.querySelector(".cart-modal__list");
  const emptyMessage = modal.querySelector(".cart-modal__empty");
  const clearBtn = modal.querySelector(".cart-modal__delete");

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
    } else {
      emptyMessage.style.display = "none";
      list.style.display = "block";

      items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "cart-modal__item";
        li.innerHTML = `
          <span>${item.title}</span>
          <span>${item.quantity} × ${item.price.toFixed(2)} $</span>
        `;
        list.appendChild(li);
      });
    }
  };

  clearBtn.addEventListener("click", () => {
    clearCart();
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  subscribe(renderCart);

  return {
    element: modal,
    open,
    close,
  };
}
