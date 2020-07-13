import Chromosome from "./chromosome.js";

class Population {
  constructor(target, popSize, maxGenerations, numParents, mutationRate) {
    this.target = target;
    this.popSize = popSize;
    this.maxGenerations = maxGenerations;
    this.numParents = numParents;
    this.mutationRate = mutationRate;

    this.population = [];
    this.isFinished = false;
    this.currentGeneration = 1;

    for (let i = 0; i < popSize; i++) {
      this.population.push(new Chromosome(this.target.length));
    }
  }

  calculateFitness() {
    this.population.forEach((chromosome) =>
      chromosome.calculateFitness(this.target)
    );

    this.population = this.population.sort((a, b) => b.fitness - a.fitness);
  }

  evaluate() {
    if (
      this.population[0].fitness === this.target.length ||
      this.currentGeneration > this.maxGenerations
    ) {
      this.isFinished = true;
    }

    if (!this.isFinished) {
      this._generate();
    }
  }

  _generate() {
    const parents = this._selection();

    const newPopulation = [];
    for (let i = 0; i < this.popSize; i++) {
      const parent1 = parents[Math.floor(Math.random() * parents.length)];
      const parent2 = parents[Math.floor(Math.random() * parents.length)];
      const offspring = this._crossover(parent1, parent2);
      const mutatedOffspring = this._mutate(offspring);
      newPopulation.push(mutatedOffspring);
    }

    this.population = newPopulation;
    this.currentGeneration += 1;
  }

  _selection() {
    const totalFitness = this.population.reduce(
      (totalFitness, chromosome) => (totalFitness += chromosome.fitness),
      0
    );

    let previousProbability = 0;
    const probabilities = this.population.map((chromosome) => {
      const probability =
        previousProbability + chromosome.fitness / totalFitness;

      previousProbability = probability;

      return probability;
    });

    const parents = [];
    for (let i = 0; i < this.numParents; i++) {
      const randomSpin = Math.random();

      for (let j = 0; j < probabilities.length; j++) {
        if (randomSpin < probabilities[j]) {
          parents.push(this.population[j]);
          break;
        }
      }
    }

    return parents;
  }

  _crossover(parent1, parent2) {
    const genes = parent1.crossoverWith(parent2);
    const offSpring = new Chromosome(this.target.length);
    offSpring.genes = genes;

    return offSpring;
  }

  _mutate(offspring) {
    offspring.mutate(this.mutationRate);
    return offspring;
  }
}

export default Population;
