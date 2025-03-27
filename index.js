import languageList from "./collection.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const secretWord =
  languageList[Math.floor(Math.random() * languageList.length)];

let maxAttempts = 4;
let wrongLetters = [];
let progress = Array(secretWord.length).fill("_");

const randomIndex = Math.floor(Math.random() * secretWord.length);
const revealedLetter = secretWord[randomIndex];

progress[randomIndex] = revealedLetter;

console.log("Jogo da forca");
console.log("Tema: Progamação");
console.log(`A palavra tem ${secretWord.length} letras: ${progress.join(" ")}`);

function askLetter() {
  rl.question("\nDigite uma letra: ", (letter) => {
    letter = letter.toLowerCase();

    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
      console.log("⚠️ Digite uma letra válida!");
      return askLetter();
    }

    if (progress.includes(letter) || wrongLetters.includes(letter)) {
      console.log("🔁 Você já tentou essa letra!");
      return askLetter();
    }

    if (secretWord.includes(letter)) {
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
          progress[i] = letter;
        }
      }
      console.log("✅ Você acertou!");
    } else {
      wrongLetters.push(letter);
      maxAttempts--;
      console.log(`❌ Você errou! Tentativas restantes: ${maxAttempts}`);
    }

    console.log(progress.join(" "));
    console.log(`Letras erradas: ${wrongLetters.join(", ")}`);

    if (!progress.includes("_")) {
      console.log("\n🎉 Parabéns! Você acertou a palavra!");
      return rl.close();
    }

    if (maxAttempts === 0) {
      console.log(`\n💀 Você perdeu! A palavra era: ${secretWord}`);
      return rl.close();
    }

    askLetter();
  });
}

askLetter();
