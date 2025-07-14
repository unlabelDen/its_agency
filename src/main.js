import { createNavbar } from "./components/navbar/navbar";
import { createSlider } from "./components/slider/slider";

const app = document.getElementById("app");

const navbar = createNavbar();
const slider = createSlider();

app.prepend(slider);
app.prepend(navbar);
