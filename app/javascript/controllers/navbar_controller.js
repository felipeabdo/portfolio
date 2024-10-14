import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["listItem", "partial"];

  connect() {
    this.selectedPartial = this.partialTarget;
    this.activateDefault();
    this.scrollToTopOnLoad();
  }

  activateDefault() {
    // Encontre todos os elementos li
    const listItems = this.element.querySelectorAll("li.nav-item");
    console.log("List items:", listItems);

    // Encontre a segunda li
    const secondLi = listItems[1];
    console.log("Second li:", secondLi);

    if (secondLi) {
      // Adiciona a classe "active" à segunda li
      secondLi.classList.add("active");

      // Exibe a partial correspondente
      const secondPartialId = secondLi.classList[1];
      console.log("Second partial ID:", secondPartialId);
      const secondPartial = document.getElementById(`${secondPartialId}-page`);
      console.log("Second partial:", secondPartial);

      if (secondPartial) {
        secondPartial.style.display = "block"; // Exibe a partial padrão

        // Armazena a li e a partial selecionadas
        this.selectedLi = secondLi;
        this.selectedPartial = secondPartial;
      } else {
        console.error("Partial correspondente não encontrada.");
      }
    } else {
      console.error("Segunda li não encontrada.");
    }
  }

  showPartial(event) {
    event.preventDefault();

    // Desfaz a animação da li anterior
    if (this.selectedLi) {
      this.selectedLi.classList.remove("active");
    }

    const clickedPartialId = event.currentTarget.classList[1];
    const clickedPartial = document.getElementById(`${clickedPartialId}-page`);

    this.selectedPartial.style.display = "none"; // Oculta a partial anterior
    clickedPartial.style.display = "block"; // Exibe a partial clicada

    this.selectedPartial = clickedPartial; // Atualiza a partial selecionada
    this.selectedLi = event.currentTarget; // Armazena a li clicada
    this.selectedLi.classList.add("active"); // Adiciona a classe "active" à li clicada
  }

  scrollToTopOnLoad() {
    window.scrollTo(0, 0);
  }
}
