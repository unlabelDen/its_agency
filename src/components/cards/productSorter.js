export class ProductSorter {
  static sort(products, criterion) {
    switch (criterion) {
      case "expensive":
        return [...products].sort((a, b) => b.price - a.price);
      case "cheap":
        return [...products].sort((a, b) => a.price - b.price);
      case "stock":
        return [...products].sort((a, b) => b.rating.count - a.rating.count);
      case "rating":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return products;
    }
  }
}
