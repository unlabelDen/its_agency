export class ProductFilter {
  constructor(container, onFilterChange) {
    this.container = container;
    this.onFilterChange = onFilterChange;
    this.filterCheckboxes = container.querySelectorAll('input[name="filter"]');
    this.activeFilters = [];

    this.init();
  }

  init() {
    this.filterCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.handleFilterChange();
      });
    });
  }

  handleFilterChange() {
    this.activeFilters = [];

    this.filterCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        this.activeFilters.push(checkbox.value);
      }
    });

    this.onFilterChange(this.activeFilters);
  }

  static applyFilters(products, filters) {
    if (filters.length === 0) {
      return products;
    }

    return products.filter((product) => {
      return filters.some((filter) => {
        switch (filter) {
          case "mens-clothing":
            return product.category === "men's clothing";
          case "jewelery":
            return product.category === "jewelery";
          case "womens-clothing":
            return product.category === "women's clothing";
          case "electronics":
            return product.category === "electronics";

          default:
            return false;
        }
      });
    });
  }
}
