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
    "Siendo consciente de la imposibilidad de adaptarse al mundo que le rodeaba – o rechazaba, más bien –, el niño – adolescente ya – en un descuido de sus padres, se suicidó para mejor culpar al mundo del dolor que su herida primigenia le causaba, dejando un reguero de dolor sordo perpetuo en su familia.";
  ending.dataset.background = "image10.jpeg";
  updateBackgroundWhenVisible(ending);
});
