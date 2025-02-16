// Initial balance
let balance = 100;

// Get DOM elements
const balanceInput = document.getElementById("balance");
const betAmountInput = document.getElementById("betAmount");
const betHighButton = document.getElementById("betHigh");
const betMidButton = document.getElementById("betMid");
const betLowButton = document.getElementById("betLow");
const rollDiceButton = document.getElementById("rollDice");
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const resultText = document.getElementById("resultText");

// Popup elements
const resultPopup = document.getElementById("resultPopup");
const popupMessage = document.getElementById("popupMessage");
const closePopupButton = document.getElementById("closePopup");

let currentBet = null;

function updateBalance() {
  let inputBalance = parseInt(document.getElementById("balance").value);
  if (isNaN(inputBalance) || inputBalance < 1) {
    document.getElementById("balance").value = balance;
  } else {
    balance = inputBalance;
  }
}

// Function to handle bet selection
function selectBet(button, betType) {
  // Remove 'selected' class from all buttons
  betHighButton.classList.remove("selected");
  betMidButton.classList.remove("selected");
  betLowButton.classList.remove("selected");

  // Add 'selected' class to the clicked button
  button.classList.add("selected");

  // Set the current bet
  currentBet = betType;
}

// Event listeners for bet buttons
betHighButton.addEventListener("click", () => selectBet(betHighButton, "high"));
betMidButton.addEventListener("click", () => selectBet(betMidButton, "mid"));
betLowButton.addEventListener("click", () => selectBet(betLowButton, "low"));

// Function to show popup with result
function showPopup(message) {
  popupMessage.textContent = message;
  resultPopup.style.display = "flex";
}

// Function to hide popup
function hidePopup() {
  resultPopup.style.display = "none";
}

// Event listener for close popup button
closePopupButton.addEventListener("click", hidePopup);

// Roll dice function
rollDiceButton.addEventListener("click", () => {
  if (!currentBet) {
    alert("Please place a bet first!");
    return;
  }

  const betAmount = parseInt(betAmountInput.value);
  if (betAmount > balance || betAmount <= 0) {
    alert("Invalid bet amount!");
    return;
  }

  // Roll three dice
  const diceResults = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];

  // Display dice results
  dice1.textContent = diceResults[0];
  dice2.textContent = diceResults[1];
  dice3.textContent = diceResults[2];

  // Calculate sum
  const sum = diceResults[0] + diceResults[1] + diceResults[2];

  // Determine outcome
  let result = "";
  if (currentBet === "high" && sum >= 12) {
    balance += betAmount;
    result = `You won! Sum is ${sum}.`;
  } else if (currentBet === "mid" && sum === 11) {
    balance += betAmount * 5;
    result = `You won 5x! Sum is ${sum}.`;
  } else if (currentBet === "low" && sum <= 10) {
    balance += betAmount;
    result = `You won! Sum is ${sum}.`;
  } else {
    balance -= betAmount;
    result = `You lost! Sum is ${sum}.`;
  }

  // Update balance and display result
  balanceInput.value = balance;
  resultText.textContent = result;

  // Show popup with result
  showPopup(result);

  // Reset bet selection
  currentBet = null;
  betHighButton.classList.remove("selected");
  betMidButton.classList.remove("selected");
  betLowButton.classList.remove("selected");
});
