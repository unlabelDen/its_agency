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

export function removeFromCart(productId) {
  const existing = cartItems.find((item) => item.id === productId);
  if (existing && existing.quantity > 1) {
    existing.quantity--;
  } else {
    cartItems = cartItems.filter((item) => item.id !== productId);
  }
  notifySubscribers();
}

export function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    cartItems = cartItems.filter((item) => item.id !== productId);
  } else {
    const existing = cartItems.find((item) => item.id === productId);
    if (existing) {
      existing.quantity = quantity;
    }
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
      <div class="cart-modal__header">
        <div class="cart-modal__title">Корзина</div>
        <button class="cart-modal__close" aria-label="Закрыть корзину">×</button>
      </div>
      <div class="cart-modal__info">
        <div class="cart-modal__count">
          <span class="cart-modal__count-text"></span>
          <button class="cart-modal__clear">Очистить список</button>
        </div>
      </div>
      <div class="cart-modal__items">
        <div class="cart-modal__empty">Корзина пока пуста.</div>
        <div class="cart-modal__list"></div>
      </div>
      <div class="cart-modal__footer">
        <div class="cart-modal__total">
          <span class="cart-modal__total-label">Итого</span>
          <span class="cart-modal__total-price">0 $</span>
        </div>
        <button class="cart-modal__checkout">ОФОРМИТЬ ЗАКАЗ</button>
      </div>
    </div>
  `;

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

  const getWordForm = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "товар";
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return "товара";
    } else {
      return "товаров";
    }
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
    totalPrice.textContent = `${totalAmount} $`;

    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-modal__item";
      itemElement.innerHTML = `
        <div class="cart-modal__item-image">
    <img src="${item.image}" alt="${item.title}">
  </div>
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

    const decreaseButtons = list.querySelectorAll(".cart-modal__item-decrease");
    const increaseButtons = list.querySelectorAll(".cart-modal__item-increase");
    const refreshButtons = list.querySelectorAll(".cart-modal__item-delete");

    decreaseButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = parseInt(btn.dataset.id);
        removeFromCart(productId);
      });
    });

    increaseButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = parseInt(btn.dataset.id);
        const product = items.find((item) => item.id === productId);
        if (product) {
          addToCart(product);
        }
      });
    });

    refreshButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = parseInt(btn.dataset.id);
        updateQuantity(productId, 0);
      });
    });
  };

  clearBtn.addEventListener("click", () => {
    clearCart();
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  checkoutBtn.addEventListener("click", () => {
    alert("Переход к оформлению заказа");
  });

  subscribe(renderCart);

  return {
    element: modal,
    open,
    close,
  };
}
