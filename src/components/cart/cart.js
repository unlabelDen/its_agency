let cartCount = 0;
const subscribers = [];

export function addToCart() {
  cartCount++;
  notifySubscribers();
}

export function getCartCount() {
  return cartCount;
}

export function subscribe(callback) {
  subscribers.push(callback);
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb(cartCount));
}
