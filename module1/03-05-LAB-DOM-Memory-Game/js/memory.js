class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsClickedCounter;
    this.guessedCards = [];
    this.pairsGuessed = 0;
    this.pairsGuessedCounter;
    this.shuffleCards();
  }
  shuffleCards() {
    let currentIndex = this.cards.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  cardClicked(card) {
    console.log("Card clicked: ", card);
    if (this.guessedCards.includes(card)) return;
    if (this.pickedCards.length < 2) {
      this.pickedCards.push(card);
      this.flipCard(card);
    }

    if (this.pickedCards.length == 2) {
      this.pairsClicked += 1;
      this.updatePairsClickedCounter();
      if (this.checkIfPair()) this.isFinished();
      else this.resetPickedCards();
    }
  }

  disableCard(card) {
    card.setAttribute("disabled", true);
    card.childNodes.forEach(child => {
      child.setAttribute("disabled", true);
    });
    console.log("Card disabled: ", card);
  }

  updatePairsClickedCounter() {
    this.pairsClickedCounter.innerText = this.pairsClicked;
  }

  updatePairsGuessedCounter() {
    this.pairsGuessedCounter.innerText = this.pairsGuessed;
  }

  resetPickedCards() {
    setTimeout(() => {
      this.pickedCards.forEach(card => this.flipCard(card));
      this.pickedCards = [];
    }, 1000);
  }

  flipCard(card) {
    card.childNodes.forEach(child => {
      child.classList.toggle("back");
    });
    console.log("Card flipped: ", card);
  }

  checkIfPair() {
    if (this.pickedCards.length < 2) return;
    const card1 = this.pickedCards[0];
    const card1Name = card1.getAttribute("data-card-name");
    const card2 = this.pickedCards[1];
    const card2Name = card2.getAttribute("data-card-name");
    if (card1 !== card2 && card1Name === card2Name) {
      this.disableCard(card1);
      this.disableCard(card2);
      this.guessedCards.push(card1);
      this.pairsGuessed += 1;
      this.updatePairsGuessedCounter();
      this.pickedCards = [];
      return true;
    } else {
      return false;
    }
  }

  isFinished() {
    if (this.pairsGuessed == this.cards.length / 2) return true;
    else return false;
  }
}
