import "./components/styles/global.scss";
import { createNavbar } from "./components/navbar/navbar";
import { createSlider } from "./components/slider/slider";
import { createCards } from "./components/cards/cards";

async function main() {
  const app = document.getElementById("app");

  const navbar = createNavbar();
  const slider = await createSlider();
  const cards = await createCards();

  app.prepend(slider);
  app.prepend(navbar);
  app.append(cards);
}

main();
