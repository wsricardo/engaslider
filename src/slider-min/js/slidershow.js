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

console.warn("Deprecation Warning: 'slidershow.js' is deprecated and will be removed in future versions. Please migrate to 'engaslider.js'.");

/**
 * Classe de controle do componente Engaslider.
 * (Mantido aqui para compatibilidade reversa)
 */
class Engaslider {
  constructor(containerSelector, userOptions = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.error(`Engaslider: Container correspondente ao seletor "${containerSelector}" não foi encontrado.`);
      return;
    }

    this.options = {
      autoplay: false,
      speed: userOptions.speed || userOptions.timespeed || 3000,
      loop: userOptions.loop !== undefined ? userOptions.loop : true,
      ...userOptions
    };

    this.slideIndex = 0;
    this.autoplayInterval = null;

    this.slides = this.container.querySelectorAll(".slider-image");
    this.dotsNav = this.container.querySelectorAll(".slider-dots-nav");
    this.prevBtn = this.container.querySelector(".slider-previous-button");
    this.nextBtn = this.container.querySelector(".slider-next-button");

    const thumbContainer = this.container.querySelector(".slider-main-thumbnail, .slider-main-thumbnail-horizontal, #slider-thumbnail");
    this.thumbNav = thumbContainer ? thumbContainer.querySelectorAll("img") : [];

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;
    this.bindEvents();
    this.showImage();
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.mvImage(-1);
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.mvImage(1);
      });
    }

    this.dotsNav.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    this.thumbNav.forEach((thumb, index) => {
      thumb.addEventListener("click", () => this.goToSlide(index));
    });
  }

  showImage() {
    const totalSlides = this.slides.length;

    if (this.slideIndex >= totalSlides) {
      this.slideIndex = this.options.loop ? 0 : totalSlides - 1;
    } else if (this.slideIndex < 0) {
      this.slideIndex = this.options.loop ? totalSlides - 1 : 0;
    }

    this.slides.forEach((slide, index) => {
      slide.style.display = index === this.slideIndex ? "block" : "none";
    });

    this.dotsNav.forEach((dot, index) => {
      if (index === this.slideIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    this.thumbNav.forEach((thumb, index) => {
      if (index === this.slideIndex) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });
  }

  mvImage(direction) {
    this.slideIndex += direction;
    this.showImage();
    if (this.options.autoplay) {
      this.resetAutoplay();
    }
  }

  goToSlide(index) {
    this.slideIndex = index;
    this.showImage();
    if (this.options.autoplay) {
      this.resetAutoplay();
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.mvImage(1);
    }, this.options.speed);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  resetAutoplay() {
    this.startAutoplay();
  }
}
