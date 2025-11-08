/**
 * Lightbox Image Viewer
 * Un visualizador de imágenes moderno y responsive
 */

class Lightbox {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.overlay = null;
    this.init();
  }

  init() {
    // Crear el HTML del lightbox
    this.createLightboxHTML();

    // Recopilar todas las imágenes de las galerías
    this.collectImages();

    // Agregar eventos de clic a las imágenes
    this.attachEventListeners();

    // Eventos del teclado
    document.addEventListener("keydown", (e) => this.handleKeyboard(e));
  }

  createLightboxHTML() {
    const lightboxHTML = `
      <div id="lightbox-overlay" class="lightbox-overlay">
        <span class="lightbox-close" id="lightbox-close" title="Cerrar (Esc)">&times;</span>
        <span class="lightbox-nav lightbox-prev" id="lightbox-prev" title="Anterior (←)">&#10094;</span>
        <span class="lightbox-nav lightbox-next" id="lightbox-next" title="Siguiente (→)">&#10095;</span>
        <div class="lightbox-counter" id="lightbox-counter"></div>
        <div class="lightbox-loading" id="lightbox-loading" style="display: none;"></div>
        <div class="lightbox-content">
          <img id="lightbox-image" class="lightbox-image" src="" alt="">
          <div id="lightbox-title" class="lightbox-title"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", lightboxHTML);
    this.overlay = document.getElementById("lightbox-overlay");

    // Eventos de navegación
    document.getElementById("lightbox-close").addEventListener("click", () => this.close());
    document.getElementById("lightbox-prev").addEventListener("click", () => this.prev());
    document.getElementById("lightbox-next").addEventListener("click", () => this.next());

    // Cerrar al hacer clic en el fondo
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Soporte para gestos táctiles (swipe)
    this.addTouchSupport();
  }

  addTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.overlay.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.overlay.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      },
      { passive: true }
    );
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe izquierda - siguiente
        this.next();
      } else {
        // Swipe derecha - anterior
        this.prev();
      }
    }
  }

  collectImages() {
    // Recopilar imágenes de piscinas, proyectos, productos y accesorios
    const galleryLinks = document.querySelectorAll("a[data-lightbox]");

    galleryLinks.forEach((link, index) => {
      const img = link.querySelector("img");
      if (img) {
        this.images.push({
          src: link.getAttribute("href"),
          title: link.getAttribute("data-title") || img.getAttribute("alt") || "",
          element: link,
        });
      }
    });
  }

  attachEventListeners() {
    this.images.forEach((image, index) => {
      // Prevenir comportamiento por defecto del enlace
      image.element.addEventListener("click", (e) => {
        e.preventDefault();
        this.open(index);
      });

      // Agregar clase wrapper para efecto hover si no existe
      if (!image.element.classList.contains("gallery-image-wrapper")) {
        image.element.classList.add("gallery-image-wrapper");
      }

      // Mejorar accesibilidad
      image.element.setAttribute("role", "button");
      image.element.setAttribute("aria-label", `Ver imagen: ${image.title}`);

      // Permitir navegación con teclado (Enter/Space)
      image.element.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.open(index);
        }
      });
    });
  }

  open(index) {
    this.currentIndex = index;
    this.showImage();
    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevenir scroll del body

    // Mejorar accesibilidad
    this.overlay.setAttribute("aria-hidden", "false");
    document.getElementById("lightbox-close").focus();
  }

  close() {
    this.overlay.classList.remove("active");
    document.body.style.overflow = ""; // Restaurar scroll

    // Mejorar accesibilidad
    this.overlay.setAttribute("aria-hidden", "true");

    // Devolver el foco al elemento que abrió el lightbox
    if (this.images[this.currentIndex]) {
      this.images[this.currentIndex].element.focus();
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage();
  }

  showImage() {
    const image = this.images[this.currentIndex];
    const imgElement = document.getElementById("lightbox-image");
    const titleElement = document.getElementById("lightbox-title");
    const counterElement = document.getElementById("lightbox-counter");
    const loadingElement = document.getElementById("lightbox-loading");

    // Mostrar loading
    loadingElement.style.display = "block";
    imgElement.style.opacity = "0";

    // Crear nueva imagen para precargar
    const newImg = new Image();
    newImg.onload = () => {
      imgElement.src = image.src;
      imgElement.alt = image.title;
      titleElement.textContent = image.title;
      counterElement.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

      // Ocultar loading con animación
      setTimeout(() => {
        loadingElement.style.display = "none";
        imgElement.style.opacity = "1";
      }, 100);
    };

    newImg.onerror = () => {
      loadingElement.style.display = "none";
      titleElement.textContent = "Error al cargar la imagen";
      imgElement.src = "";
      imgElement.style.opacity = "1";
      console.error("Error al cargar la imagen:", image.src);
    };

    newImg.src = image.src;
  }

  handleKeyboard(e) {
    if (!this.overlay.classList.contains("active")) return;

    switch (e.key) {
      case "Escape":
        this.close();
        break;
      case "ArrowLeft":
        this.prev();
        break;
      case "ArrowRight":
        this.next();
        break;
      case "Home":
        this.currentIndex = 0;
        this.showImage();
        break;
      case "End":
        this.currentIndex = this.images.length - 1;
        this.showImage();
        break;
    }
  }
}

// Inicializar el lightbox cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.lightbox = new Lightbox();
  });
} else {
  window.lightbox = new Lightbox();
}
