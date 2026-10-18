const modeToggle = document.getElementById("modo");
const ending = document.getElementById("ending");
const endingText = document.getElementById("final");
const storySteps = document.querySelectorAll(".story-step");
const backgroundImages = [
  ...[...storySteps].map((step) => step.dataset.background),
  "image9.jpeg",
  "image10.jpeg",
];

backgroundImages.forEach((src) => {
  const image = new Image();
  image.src = src;
});

modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", modeToggle.checked);
});

const showBackground = (step) => {
  document.body.style.setProperty(
    "--story-background",
    `url("${step.dataset.background}")`,
  );
};

const updateBackgroundWhenVisible = (step) => {
  const bounds = step.getBoundingClientRect();
  if (bounds.top < window.innerHeight && bounds.bottom > 0) {
    showBackground(step);
  }
};

if (storySteps.length > 0) {
  showBackground(storySteps[0]);

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleStep = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (first, second) => second.intersectionRatio - first.intersectionRatio,
        )[0];
      if (visibleStep) {
        showBackground(visibleStep.target);
      }
    },
    { rootMargin: "-40% 0px -40% 0px" },
  );

  storySteps.forEach((step) => observer.observe(step));
}

document.getElementById("dame").addEventListener("click", () => {
  endingText.textContent =
    "El niño se hizo un joven casi adulto y quiso llenar su vacío interior adentrándose por las intransitables selvas de la droga, alcohol y la delincuencia. Cada vez se encontró mayor rechazo social y familiar, y tras ingresar en centros de menores, y posteriormente, penales, al final, murió joven, en una espiral de violencia y furia, llevándose por delante a cuantos inocentes osaron enfrentarse en su camino de violencia y destrucción.";
  ending.dataset.background = "image9.jpeg";
  updateBackgroundWhenVisible(ending);
});

document.getElementById("damedos").addEventListener("click", () => {
  endingText.textContent =
    "Aún con muchas dificultades, la familia, y el colegio mantuvieron un esfuerzo coordinado por hacerle sentir especialmente amado y bueno. Pudo tener, por fin, un amigo, haciéndolo sentir, por primera vez, merecedor del afecto de sus iguales. Un profesor se atrevió a mirar mas allá de su apariencia hosca, y logró hacerse un hueco en su corazón atribulado. Inconmensurables cantidades de amor y paciencia de todos cuantos le rodearon le ayudaron a llenar su vacío interior y restañar su herida primigenia con el amor de sus semejantes. Y cuando alcanzó la madurez, pudo elevarse más allá de su doloroso origen, y desarrollar una vida plena, criar una familia, y crear relaciones plenas afectivas con cuantos lo rodearon, y hacer felices a sus semejantes siendo feliz el mismo.";
  ending.dataset.background = "image10.jpeg";
  updateBackgroundWhenVisible(ending);
});
