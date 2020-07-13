import Population from "./population.js";

const target = "if music be the food of love play on";
const popSize = 1000;
const numParents = 300;
const mutationRate = 0.01;
const maxGenerations = 10000;

const population = new Population(
  target,
  popSize,
  maxGenerations,
  numParents,
  mutationRate
);

function loop() {
  if (population.isFinished) return;

  population.calculateFitness();
  updateUI(population);
  population.evaluate();

  requestAnimationFrame(loop);
}

function updateUI(population) {
  updatePopulationUI(population.population);
  updateStats(population.getStats());
}

function updatePopulationUI(population) {
  const populationList = document.querySelector("#population");
  populationList.innerHTML = "";

  // We only want to show the top 20 for performance reasons
  const listItems = population.slice(0, 20).map(createListItem);

  listItems.forEach((li) => populationList.appendChild(li));
}

function createListItem(chromosome) {
  const listItem = document.createElement("li");
  listItem.classList.add("chromosome");

  const guessContainer = document.createElement("div");
  chromosome
    .toString()
    .split("")
    .forEach((gene, i) => {
      const span = document.createElement("span");
      span.innerHTML = gene;
      const isError = gene !== target.charAt(i);

      if (isError) {
        span.classList.add("error");
      }

      guessContainer.appendChild(span);
    });

  const fitness = document.createElement("span");
  fitness.innerHTML = chromosome.fitness;

  listItem.appendChild(guessContainer);
  listItem.appendChild(fitness);

  return listItem;
}

function updateStats(stats) {
  document.querySelector("#currentGeneration").textContent =
    stats.currentGeneration;
  document.querySelector("#maxGeneration").textContent = stats.maxGenerations;
  document.querySelector("#popSize").textContent = stats.popSize;
  document.querySelector("#topFitness").textContent = stats.topFitness;
  document.querySelector(
    "#aveFitness"
  ).textContent = stats.averageFitness.toFixed(2);
}

requestAnimationFrame(loop);
