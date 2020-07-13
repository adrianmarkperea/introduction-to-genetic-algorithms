import Population from "./population.js";

const target = "if music be the food of love play on";
const popSize = 3000;
const numParents = 500;
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
  updateUI(population.population);
  population.evaluate();

  requestAnimationFrame(loop);
}

function updateUI(population) {
  const populationList = document.querySelector("#population");
  populationList.innerHTML = "";

  // We only want to show the top 50
  const listItems = population.slice(0, 50).map(createListItem);

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

requestAnimationFrame(loop);
