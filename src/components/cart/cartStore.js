let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
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
    if (existing) existing.quantity = quantity;
  }
  notifySubscribers();
}

export function clearCart() {
  cartItems = [];
  localStorage.removeItem("cart");
  notifySubscribers();
}

export function getCartItems() {
  return cartItems;
}

export function subscribe(cb) {
  subscribers.push(cb);
}

function notifySubscribers() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
  subscribers.forEach((cb) => cb(cartItems));
}
