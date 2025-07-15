import "../styles/cardsTemplate.scss";

export const cardsTemplate = `
  <aside class="cards__filters">
    <ul class="filters">
      <li class="filters__item">
        <label class="filters__switch">
          <input type="checkbox" id="mens-clothing" name="filter" value="mens-clothing" />
          <span class="filters__slider"></span>
          <span class="filters__label">men's clothing</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="filters__switch">
          <input type="checkbox" id="jewelery" name="filter" value="jewelery" />
          <span class="filters__slider"></span>
          <span class="filters__label">jewelery</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="filters__switch">
          <input type="checkbox" id="womens-clothing" name="filter" value="womens-clothing" />
          <span class="filters__slider"></span>
          <span class="filters__label">women's clothing</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="filters__switch">
          <input type="checkbox" id="electronics" name="filter" value="electronics" />
          <span class="filters__slider"></span>
          <span class="filters__label">electronics</span>
        </label>
      </li>
    </ul>
  </aside>

  <div class="cards__content">
    <div class="cards__header">
      <div class="cards__quantity">Загрузка товаров...</div>
      <div class="sort">
        <button class="sort__toggle">Сначала дорогие ▼</button>
        <ul class="sort__list sort__list--hidden">
          <li class="sort__item" data-sort="expensive">Сначала дорогие</li>
          <li class="sort__item" data-sort="cheap">Сначала недорогие</li>
          <li class="sort__item" data-sort="stock">По количеству в наличии</li>
          <li class="sort__item" data-sort="rating">По рейтингу</li>
        </ul>
      </div>
    </div>
    <div class="cards__list"></div>
  </div>

  <div class="overlay overlay--hidden"></div>
`;
