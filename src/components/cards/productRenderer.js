export class ProductRenderer {
  constructor(container) {
    this.container = container;
  }

  render(products) {
    this.container.innerHTML = "";

    products.forEach((product) => {
      const card = this.createCard(product);
      this.container.appendChild(card);
    });
  }

  createCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card__image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="card__title">${product.title}</div>
      <div class="card__footer">
        <div class="card__price">${product.price.toFixed(2)} $</div>
        <div class="card__add">
          <button class="card__button">+</button>
        </div>
      </div>
    `;
    return card;
  }

  showError(message) {
    this.container.innerHTML = `<div class="error">${message}</div>`;
  }
}
