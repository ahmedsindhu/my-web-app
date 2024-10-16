  
let cardFront = document.querySelectorAll(".cardfront");

let cardBack = document.querySelectorAll(".cardback");
let lastClicked = []; 
const maxClicks = 2; 
let scoreCount = 0;
let score = document.querySelector("#score");


addEventListener("load", (event) => {});

onload = (event) => {shufflecards()};



// Shuffle cards
shufflecards = () => {
    const container = document.querySelector(".cards");
    const cards = Array.from(container.children);

    console.log("before shuffle=", cards);

    cards.sort(() => Math.random() - 0.5);
    container.innerHTML = '';
    cards.forEach(card => container.appendChild(card));
};

// Hide cardBack
cardBack.forEach((cardback) => {
    cardback.style.display = 'none';
});


// Frontflip 
cardFront.forEach((cardfront, index) => {
    const cardback = cardBack[index];
    cardfront.addEventListener("click", () => {
        handleCardFlip(cardfront, cardback);
          
    });
});

// Backflip 
cardBack.forEach((cardback, index) => {
    const cardfront = cardFront[index];
    cardback.addEventListener("click", () => {
        handleCardFlip(cardfront, cardback);
      
    });
});

function handleCardFlip(cardfront, cardback) {
    if (cardback.classList.contains("flipped")) return;

    if (lastClicked.length === maxClicks) {
        lastClicked.forEach(card => {
            card.cardfront.classList.remove("flipped");
            card.cardback.classList.remove("flipped");
            card.cardback.style.display = 'none';
        });
        lastClicked = []; 
    }

    cardback.classList.add("flipped");
    cardback.style.display = 'block';
    cardfront.classList.add("flipped");


    lastClicked.push({ cardfront, cardback });
    if (lastClicked.length === 2) {
        const card1ImgClass = lastClicked[0].cardback.querySelector('img').className;
        const card2ImgClass = lastClicked[1].cardback.querySelector('img').className;
    
        if (card1ImgClass === card2ImgClass) {
          // Increase score by 1
          scoreCount++;
          console.log(`Score: ${scoreCount}`);
          const matchedCards = lastClicked ;
          lastClicked =[];
          matchedCards.forEach((card)=>{
        card.cardfront.style.display = 'none';
        setTimeout(()=>{card.cardback.style.display = 'none';},900)
        score.innerText = scoreCount
        });
    
} else {
          // Wait for a short duration before flipping the cards back
          setTimeout(() => {
            lastClicked.forEach((card) => {
              card.cardfront.classList.remove("flipped");
              card.cardback.classList.remove("flipped");
              card.cardback.style.display = 'none';
            });
            lastClicked = [];
          }, 1000);

}}}


