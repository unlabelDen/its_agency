import { createNavbar } from "./components/navbar/navbar";

const app = document.getElementById("app");
const navbar = createNavbar();

app.prepend(navbar);
