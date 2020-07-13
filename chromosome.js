const ALPHABET = "abcdefghijklmnopqrstuvwxyz ";

function getRandomChar() {
  const randomIndex = Math.floor(Math.random() * ALPHABET.length);
  const randomChar = ALPHABET.charAt(randomIndex);
  return randomChar;
}

class Chromosome {
  constructor(length) {
    this.genes = [];
    this.fitness = 0;

    for (let i = 0; i < length; i++) {
      const randomChar = getRandomChar();
      this.genes.push(randomChar);
    }
  }

  calculateFitness(target) {
    this.fitness = this.genes.reduce(
      (fitness, gene, i) => (gene === target.charAt(i) ? fitness + 1 : fitness),
      0
    );
  }

  crossoverWith(other) {
    const crossoverPoint = Math.floor(Math.random() * this.genes.length);
    const newGenes = this.genes.map((gene, i) =>
      i < crossoverPoint ? gene : other.genes[i]
    );

    return newGenes;
  }

  mutate(mutationRate) {
    this.genes = this.genes.map((gene) =>
      Math.random() < mutationRate ? getRandomChar() : gene
    );
  }

  toString() {
    return this.genes.join("");
  }
}

export default Chromosome;
