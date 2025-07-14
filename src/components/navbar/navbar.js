import "./navbar.scss";
import logo from "../assets/colors.svg";
import search from "../assets/icons/search.svg";
import profile from "../assets/icons/profile.svg";
import heart from "../assets/icons/heart.svg";
import cart from "../assets/icons/cart.svg";

export function createNavbar() {
  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  nav.innerHTML = `
    <div class="navbar__container">
      <button class="navbar__burger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navbar__logo">
        <img src="${logo}" alt="Colors logo">
      </div>

      <div class="navbar__menu">
        <a href="#">Продукты</a>
        <a href="#">Цвета</a>
        <a href="#">Вдохновение</a>
        <a href="#">Советы</a>
        <a href="#">Найти магазин</a>
      </div>

      <div class="navbar__right">
        <div class="navbar__connection">
          +7 (495) 221-77-69
          <button>Заказать звонок</button>
        </div>

        <div class="navbar__icons">
          <a href="#" class="navbar__icon-search"><img src="${search}" alt="Search"></a>
          <a href="#" class="navbar__icon-profile"><img src="${profile}" alt="Profile"></a>
          <a href="#" class="navbar__icon-heart"><img src="${heart}" alt="Favorites"></a>
          <div class="navbar__icons__cart">
            <img src="${cart}" alt="Cart">
            <span>4</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const burger = nav.querySelector(".navbar__burger");

  burger.addEventListener("click", () => {
    nav.classList.toggle("navbar--menu-open");
    burger.classList.toggle("navbar__burger--active");
  });

  const menuLinks = nav.querySelectorAll(".navbar__menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("navbar--menu-open");
      burger.classList.remove("navbar__burger--active");
    });
  });

  return nav;
}
