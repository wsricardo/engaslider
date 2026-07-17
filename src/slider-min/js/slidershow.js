/*MIT License

Copyright (c) 2019 Wandeson Ricardo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

/**
 * Classe de controle do componente Engaslider.
 * Gerencia a navegação de imagens, autoplay, miniaturas e dots de paginação.
 */
class Engaslider {
  /**
   * Inicializa uma nova instância do Engaslider.
   * @param {string} containerSelector - O seletor CSS do elemento container principal do slider (ex: '#slider-main-container').
   * @param {Object} [options={}] - Configurações opcionais para customização do comportamento.
   * @param {boolean} [options.autoplay=false] - Define se a transição de slides deve ocorrer automaticamente.
   * @param {number} [options.timespeed=3000] - O intervalo em milissegundos para a transição automática de slides.
   */
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.error(`Engaslider: Container correspondente ao seletor "${containerSelector}" não foi encontrado.`);
      return;
    }

    // Configurações padrão mescladas com as opções fornecidas pelo usuário
    this.options = {
      autoplay: options.autoplay !== undefined ? options.autoplay : false,
      timespeed: options.timespeed || 3000,
      ...options
    };

    // Estado do Slider
    this.slideIndex = 0;
    this.autoplayInterval = null;

    // Elementos filhos dentro do container selecionado
    this.slides = this.container.querySelectorAll(".slider-image");
    this.dotsNav = this.container.querySelectorAll(".slider-dots-nav");
    this.prevBtn = this.container.querySelector(".slider-previous-button");
    this.nextBtn = this.container.querySelector(".slider-next-button");

    // Localiza o container de miniaturas e obtém as imagens internas
    const thumbContainer = this.container.querySelector(".slider-main-thumbnail, .slider-main-thumbnail-horizontal, #slider-thumbnail");
    this.thumbNav = thumbContainer ? thumbContainer.querySelectorAll("img") : [];

    this.init();
  }

  /**
   * Inicializa o ciclo de vida do slider, associando eventos e renderizando o slide inicial.
   */
  init() {
    if (this.slides.length === 0) {
      console.warn("Engaslider: Nenhuma imagem (.slider-image) encontrada no container do slider.");
      return;
    }

    this.bindEvents();
    this.showImage();

    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  /**
   * Associa dinamicamente escutas de evento de clique aos elementos do slider.
   */
  bindEvents() {
    // Botão de slide anterior
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.mvImage(-1);
      });
    }

    // Botão de próximo slide
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.mvImage(1);
      });
    }

    // Paginação por Dots (Bolinhas)
    this.dotsNav.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Navegação por miniaturas (Thumbnails)
    this.thumbNav.forEach((thumb, index) => {
      thumb.addEventListener("click", () => this.goToSlide(index));
    });
  }

  /**
   * Atualiza a visibilidade das imagens e os estados visuais dos dots e miniaturas.
   */
  showImage() {
    const totalSlides = this.slides.length;

    // Correção dos limites do índice
    if (this.slideIndex >= totalSlides) {
      this.slideIndex = 0;
    } else if (this.slideIndex < 0) {
      this.slideIndex = totalSlides - 1;
    }

    // Exibe apenas a imagem correspondente ao índice atual
    this.slides.forEach((slide, index) => {
      if (index === this.slideIndex) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });

    // Atualiza a classe ativa nos dots (bolinhas)
    this.dotsNav.forEach((dot, index) => {
      if (index === this.slideIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Atualiza a classe ativa nas miniaturas (thumbnails)
    this.thumbNav.forEach((thumb, index) => {
      if (index === this.slideIndex) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });
  }

  /**
   * Desloca o índice do slide atual por um determinado delta (direção).
   * @param {number} direction - O número de passos a avançar (positivo) ou retroceder (negativo).
   */
  mvImage(direction) {
    this.slideIndex += direction;
    this.showImage();
    
    // Se o autoplay estiver ligado, reinicia o temporizador ao interagir manualmente
    if (this.options.autoplay) {
      this.resetAutoplay();
    }
  }

  /**
   * Navega diretamente para um slide específico pelo seu índice.
   * @param {number} index - O índice do slide desejado (base zero).
   */
  goToSlide(index) {
    this.slideIndex = index;
    this.showImage();

    // Se o autoplay estiver ligado, reinicia o temporizador ao interagir manualmente
    if (this.options.autoplay) {
      this.resetAutoplay();
    }
  }

  /**
   * Inicia o intervalo de rotação automática dos slides.
   */
  startAutoplay() {
    this.stopAutoplay(); // Garante que não haja múltiplos intervalos rodando simultaneamente
    this.autoplayInterval = setInterval(() => {
      this.mvImage(1);
    }, this.options.timespeed);
  }

  /**
   * Interrompe o intervalo de rotação automática.
   */
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  /**
   * Reinicia o temporizador do autoplay.
   */
  resetAutoplay() {
    this.startAutoplay();
  }
}
