document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", abierto);
    toggle.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú" : "Abrir menú"
    );
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Carrusel */
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dotsContainer = document.querySelector(".carousel-dots");
  const previousButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  let currentSlide = 0;
  let carousel;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, position) => {
      slide.classList.toggle("is-active", position === currentSlide);
    });

    document.querySelectorAll(".carousel-dot").forEach((dot, position) => {
      dot.classList.toggle("is-active", position === currentSlide);
    });
  }

  slides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver foto ${index + 1}`);

    dot.addEventListener("click", () => {
      showSlide(index);
      restartCarousel();
    });

    dotsContainer.appendChild(dot);
  });

  previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    restartCarousel();
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    restartCarousel();
  });

  function startCarousel() {
    carousel = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 7000); // Cambia 7000 por 5000 para 5 segundos.
  }

  function restartCarousel() {
    clearInterval(carousel);
    startCarousel();
  }

  showSlide(0);
  startCarousel();

  /* Animaciones al aparecer las secciones */
  const elements = document.querySelectorAll(
    "#servicios .eyebrow, #servicios h2, #servicios .intro, #servicios article, #trabajos .eyebrow, #trabajos h2, #trabajos .intro, .work-grid, #contacto > div > *, .location-card"
  );

  elements.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));

  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});