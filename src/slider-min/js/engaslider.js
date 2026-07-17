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
 * Classe de controle do componente Engaslider 2.0.
 * Gerencia a navegação de imagens, autoplay, miniaturas e dots de paginação de forma isolada.
 */
class Engaslider {
  /**
   * Inicializa uma nova instância do Engaslider.
   * @param {string} containerSelector - O seletor CSS do elemento container principal do slider (ex: '#slider-main-container').
   * @param {Object} [userOptions={}] - Configurações opcionais de comportamento do slider.
   * @param {boolean} [userOptions.autoplay=false] - Habilita a rotação automática dos slides.
   * @param {number} [userOptions.speed=3000] - Tempo de exibição de cada imagem em milissegundos (padrão: 3000).
   * @param {boolean} [userOptions.loop=true] - Habilita rotação cíclica infinita de slides.
   */
  constructor(containerSelector, userOptions = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.error(`Engaslider: Container correspondente ao seletor "${containerSelector}" não foi encontrado.`);
      return;
    }

    // Mesclando opções padrão com as fornecidas pelo usuário
    this.options = {
      autoplay: false,
      speed: userOptions.speed || userOptions.timespeed || 3000,
      loop: userOptions.loop !== undefined ? userOptions.loop : true,
      ...userOptions
    };

    // Estado interno do slider
    this.slideIndex = 0;
    this.autoplayInterval = null;

    // Seletores internos do container selecionado
    this.slides = this.container.querySelectorAll(".slider-image");
    this.dotsNav = this.container.querySelectorAll(".slider-dots-nav");
    this.prevBtn = this.container.querySelector(".slider-previous-button");
    this.nextBtn = this.container.querySelector(".slider-next-button");

    // Localiza miniaturas
    const thumbContainer = this.container.querySelector(".slider-main-thumbnail, .slider-main-thumbnail-horizontal, #slider-thumbnail");
    this.thumbNav = thumbContainer ? thumbContainer.querySelectorAll("img") : [];

    // Referências de manipuladores de eventos bound (para limpeza limpa no destroy)
    this.boundPrevClick = this.prevClick.bind(this);
    this.boundNextClick = this.nextClick.bind(this);
    this.boundDotClicks = [];
    this.boundThumbClicks = [];

    this.init();
  }

  /**
   * Inicializa o slider.
   */
  init() {
    if (this.slides.length === 0) {
      console.warn("Engaslider: Nenhuma imagem (.slider-image) encontrada.");
      return;
    }

    this.setupAccessibility();
    this.bindEvents();
    this.showImage();

    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  /**
   * Configura os atributos de acessibilidade (a11y) do slider de forma dinâmica.
   */
  setupAccessibility() {
    this.container.setAttribute("role", "region");
    this.container.setAttribute("aria-roledescription", "carousel");
    this.container.setAttribute("aria-live", "polite");

    if (this.prevBtn) {
      this.prevBtn.setAttribute("role", "button");
      this.prevBtn.setAttribute("aria-label", "Slide anterior");
    }

    if (this.nextBtn) {
      this.nextBtn.setAttribute("role", "button");
      this.nextBtn.setAttribute("aria-label", "Próximo slide");
    }

    this.dotsNav.forEach((dot, index) => {
      dot.setAttribute("role", "button");
      dot.setAttribute("aria-label", `Ir para o slide ${index + 1}`);
      dot.setAttribute("aria-selected", "false");
    });

    this.thumbNav.forEach((thumb, index) => {
      thumb.setAttribute("role", "button");
      thumb.setAttribute("aria-label", `Ver miniatura da imagem ${index + 1}`);
    });
  }

  /**
   * Registra escutadores de eventos mantendo as referências para limpeza posterior.
   */
  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", this.boundPrevClick);
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", this.boundNextClick);
    }

    this.dotsNav.forEach((dot, index) => {
      const handler = () => this.goToSlide(index);
      this.boundDotClicks.push({ element: dot, handler });
      dot.addEventListener("click", handler);
    });

    this.thumbNav.forEach((thumb, index) => {
      const handler = () => this.goToSlide(index);
      this.boundThumbClicks.push({ element: thumb, handler });
      thumb.addEventListener("click", handler);
    });
  }

  /**
   * Callback para o clique do botão de voltar.
   */
  prevClick(e) {
    e.preventDefault();
    this.mvImage(-1);
  }

  /**
   * Callback para o clique do botão de avançar.
   */
  nextClick(e) {
    e.preventDefault();
    this.mvImage(1);
  }

  /**
   * Renderiza a imagem atual baseado no slideIndex e ativa classes correspondentes.
   */
  showImage() {
    const totalSlides = this.slides.length;
    if (totalSlides === 0) return;

    // Controle de loops circulares
    if (this.slideIndex >= totalSlides) {
      this.slideIndex = this.options.loop ? 0 : totalSlides - 1;
    } else if (this.slideIndex < 0) {
      this.slideIndex = this.options.loop ? totalSlides - 1 : 0;
    }

    // Exibição e ativação de slides
    this.slides.forEach((slide, index) => {
      if (index === this.slideIndex) {
        slide.classList.add("active");
        slide.style.display = "block";
      } else {
        slide.classList.remove("active");
        slide.style.display = "none";
      }
    });

    // Atualização de paginação (dots)
    this.dotsNav.forEach((dot, index) => {
      if (index === this.slideIndex) {
        dot.classList.add("active");
        dot.setAttribute("aria-selected", "true");
      } else {
        dot.classList.remove("active");
        dot.setAttribute("aria-selected", "false");
      }
    });

    // Atualização de miniaturas (thumbnails)
    this.thumbNav.forEach((thumb, index) => {
      if (index === this.slideIndex) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });

    // Despacha o evento customizado slideChange
    this.container.dispatchEvent(new CustomEvent("slideChange", {
      detail: { activeIndex: this.slideIndex }
    }));
  }

  /**
   * Avança ou retrocede imagens.
   */
  mvImage(direction) {
    this.slideIndex += direction;
    this.showImage();
    if (this.options.autoplay) {
      this.resetAutoplay();
    }
  }

  /**
   * Vai para um slide específico.
   */
  goToSlide(index) {
    this.slideIndex = index;
    this.showImage();
    if (this.options.autoplay) {
      this.resetAutoplay();
    }
  }

  /**
   * Inicia loop do autoplay.
   */
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.mvImage(1);
    }, this.options.speed);
  }

  /**
   * Para autoplay.
   */
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  /**
   * Reinicia autoplay.
   */
  resetAutoplay() {
    this.startAutoplay();
  }

  /**
   * Desvincula todos os ouvintes de eventos e interrompe o slider para evitar vazamento de memória.
   */
  destroy() {
    this.stopAutoplay();

    if (this.prevBtn) {
      this.prevBtn.removeEventListener("click", this.boundPrevClick);
    }

    if (this.nextBtn) {
      this.nextBtn.removeEventListener("click", this.boundNextClick);
    }

    this.boundDotClicks.forEach(({ element, handler }) => {
      element.removeEventListener("click", handler);
    });
    this.boundDotClicks = [];

    this.boundThumbClicks.forEach(({ element, handler }) => {
      element.removeEventListener("click", handler);
    });
    this.boundThumbClicks = [];

    // Limpa atributos de acessibilidade do container
    this.container.removeAttribute("role");
    this.container.removeAttribute("aria-roledescription");
    this.container.removeAttribute("aria-live");

    // Limpa referências locais para liberação de memória
    this.container = null;
    this.slides = [];
    this.dotsNav = [];
    this.thumbNav = [];
  }
}
