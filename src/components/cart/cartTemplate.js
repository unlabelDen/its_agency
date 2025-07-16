// cartTemplate.js
export function createCartModalHTML() {
  return `
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
}
