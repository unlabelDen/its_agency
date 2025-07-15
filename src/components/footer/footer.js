import "../styles/footer.scss";

export function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  footer.innerHTML = `
        <div class="footer"></div>
    `;
  return footer;
}
