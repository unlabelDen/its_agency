import "../styles/dropdown.scss";

export class Dropdown {
  constructor(container, onSortChange) {
    this.container = container;
    this.onSortChange = onSortChange;
    this.sortToggle = container.querySelector(".sort__toggle");
    this.sortList = container.querySelector(".sort__list");
    this.overlay = container.querySelector(".overlay");

    this.init();
  }

  init() {
    this.sortToggle.addEventListener("click", () => {
      this.toggle();
    });

    this.overlay.addEventListener("click", () => {
      this.close();
    });

    this.sortList.addEventListener("click", (e) => {
      if (e.target.classList.contains("sort__item")) {
        this.handleItemClick(e.target);
      }
    });
  }

  toggle() {
    this.sortList.classList.toggle("sort__list--hidden");
    this.overlay.classList.toggle("overlay--hidden");
  }

  close() {
    this.sortList.classList.add("sort__list--hidden");
    this.overlay.classList.add("overlay--hidden");
  }

  handleItemClick(item) {
    const value = item.dataset.sort;
    this.sortToggle.textContent = item.textContent + " ▼";
    this.onSortChange(value);
    this.close();
  }
}
