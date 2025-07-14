import Swiper from "swiper";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.scss";
import { getProducts } from "../api/products";

export async function createSlider() {
  const container = document.createElement("div");
  container.className = "swiper mySwiper";

  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Ошибка загрузки продуктов:", error);
    return document.createTextNode("Не удалось загрузить слайдер");
  }

  const limitedProducts = products.slice(0, 5);

  const slidesHTML = limitedProducts
    .map(
      (product) =>
        `<div class="swiper-slide"><img src="${product.image}" alt="${product.title}" /></div>`
    )
    .join("");

  container.innerHTML = `
    <div class="swiper-wrapper">
      ${slidesHTML}
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  `;

  setTimeout(() => {
    const canLoop = limitedProducts.length >= 3;

    new Swiper(".mySwiper", {
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
      cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      mousewheel: true,
      keyboard: true,
      loop: canLoop,
    });
  }, 0);

  return container;
}
