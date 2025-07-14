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
          <a href="#"><img src="${search}" alt="Search"></a>
          <a href="#"><img src="${profile}" alt="Profile"></a>
          <a href="#"><img src="${heart}" alt="Favorites"></a>
          <div class="navbar__icons__cart">
            <img src="${cart}" alt="Cart">
            <span>4</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return nav;
}
