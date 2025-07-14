import { createNavbar } from "./components/navbar/navbar";
import { createSlider } from "./components/slider/slider";

async function main() {
  const app = document.getElementById("app");

  const navbar = createNavbar();
  const slider = await createSlider();

  app.prepend(slider);
  app.prepend(navbar);
}

main();
