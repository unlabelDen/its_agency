import "../styles/cards.scss";
import { getProducts } from "../api/products";
import { Dropdown } from "./dropdown";
import { ProductSorter } from "./productSorter";
import { ProductRenderer } from "./productRenderer";
import { ProductFilter } from "./productFilter";
import { cardsTemplate } from "./cardsTemplate";

export async function createCards() {
  const cards = document.createElement("section");
  cards.classList.add("cards");
  cards.innerHTML = cardsTemplate;

  const list = cards.querySelector(".cards__list");
  const quantity = cards.querySelector(".cards__quantity");

  const productRenderer = new ProductRenderer(list);
  let products = [];
  let filteredProducts = [];
  let currentSortCriterion = null;

  const updateProductDisplay = () => {
    let productsToShow =
      filteredProducts.length > 0 ? filteredProducts : products;

    if (currentSortCriterion) {
      productsToShow = ProductSorter.sort(productsToShow, currentSortCriterion);
    }

    productRenderer.render(productsToShow);
    quantity.textContent = `${productsToShow.length} товаров`;
  };

  try {
    products = await getProducts();
    quantity.textContent = `${products.length} товаров`;

    const productFilter = new ProductFilter(cards, (activeFilters) => {
      filteredProducts = ProductFilter.applyFilters(products, activeFilters);
      updateProductDisplay();
    });

    // Инициализируем dropdown с callback для сортировки
    const dropdown = new Dropdown(cards, (sortCriterion) => {
      currentSortCriterion = sortCriterion;
      updateProductDisplay();
    });

    // Первоначальный рендер
    productRenderer.render(products);
  } catch (error) {
    quantity.textContent = "Ошибка загрузки товаров";
    productRenderer.showError("Не удалось загрузить товары. Попробуйте позже.");
    console.error("Ошибка при загрузке товаров:", error);
  }

  return cards;
}
