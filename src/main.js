import "./components/styles/global.scss";
import { createNavbar } from "./components/navbar/navbar";
import { createSlider, initSlider } from "./components/slider/slider";
import { createCards } from "./components/cards/cards";
import { createCart } from "./components/cart/cart";
import { createFooter } from "./components/footer/footer";

async function main() {
  const app = document.getElementById("app");

  const navbar = createNavbar();
  const slider = await createSlider();
  const cards = await createCards();
  const footer = createFooter();
  const cart = createCart();

  app.prepend(slider);
  app.prepend(navbar);
  app.append(cards);
  app.append(footer);

  initSlider();

  const cartIcon = document.querySelector(".navbar__icons__cart");
  cartIcon.addEventListener("click", cart.open);
}

main();
