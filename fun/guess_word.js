const WORDS = [
  "absolute", "activity", "airplane", "allergy", "alphabet", "amethyst", "analysis", "anecdote", "anything", "approach",
  "approval", "argument", "artifact", "assembly", "athletic", "attitude", "backpack", "balanced", "baseball", "bathroom",
  "birthday", "blackout", "blessing", "bluebird", "bookcase", "boundary", "building", "business", "calendar", "campfire",
  "capsules", "cardinal", "careless", "carnation", "carpenter", "cellular", "ceremony", "champion", "children", "chilling",
  "clapping", "classify", "cleaning", "colorful", "commence", "complete", "composer", "computer", "conclude", "confetti",
  "conjured", "consider", "contract", "cornmeal", "creative", "criminal", "critique", "crossing", "customer", "database",
  "daylight", "decision", "delivery", "describe", "designer", "dinosaur", "disagree", "discount", "distance", "dominion",
  "doorbell", "downtime", "drifting", "droplets", "dynamics", "earliest", "election", "electric", "elevator", "emotions",
  "employee", "engineer", "envelope", "evenings", "everyone", "exercise", "expanded", "explorer", "eyewitness", "favorite",
  "feedback", "festival", "fireball", "fishbowl", "floating", "football", "forehead", "forgotten", "freckles", "frequent",
  "friendly", "frontier", "generate", "geometry", "glorious", "grateful", "guardian", "guidance", "hamburger", "handmade",
  "handsome", "hardware", "harmony", "headache", "headline", "heartbeat", "heirloom", "heritage", "homeland", "homework",
  "hospital", "identity", "imagined", "incident", "increase", "industry", "informed", "insected", "insights", "interest",
  "internet", "interview", "jealousy", "jubilant", "junction", "keyboard", "language", "laughter", "learning", "lifestyle",
  "lighting", "location", "luncheon", "magazine", "magician", "mainland", "magnitude", "marathon", "material", "medicine",
  "merchant", "midnight", "migration", "military", "minister", "missions", "mobility", "moderate", "monument", "mountain",
  "movement", "multiple", "narrator", "national", "negative", "nickname", "notation", "notebook", "nutshell", "observer",
  "occasion", "offering", "operator", "opposite", "ordinary", "organize", "painting", "particle", "passport", "password",
  "patient", "peaceful", "peasant", "penguins", "personal", "physical", "platform", "pleasure", "position", "possible",
  "postcard", "practice", "precious", "predicts", "presence", "printer", "priority", "producer", "progress", "property",
  "proposal", "prospect", "question", "railroad", "reaction", "recovery", "relation", "remember", "renewing", "research",
  "resident", "response", "retraced", "revenues", "scissors", "seasonal", "sentence", "shipping", "shoulder", "siblings",
  "solution", "speaking", "specific", "speedway", "splendid", "standard", "starring", "starting", "strategy", "strength",
  "struggle", "suburban", "sunshine", "surprise", "survival", "swimming", "sympathy", "teachers", "together", "tomorrow"
]

const wins = 0;
const loses = 0;
const score = [wins, loses];

function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}

function green(text) {
  return `\x1b[32m${text}\x1b[0m`;
}

function yellow(text) {
  return `\x1b[33m${text}\x1b[0m`;
}

function blue(text) {
  return `\x1b[34m${text}\x1b[0m`;
}

function magenta(text) {
  return `\x1b[35m${text}\x1b[0m`;
}

function cyan(text) {
  return `\x1b[36m${text}\x1b[0m`;
}

function italic(text) {
  return `\x1b[3m${text}\x1b[0m`;
}

function underline(text) {
  return `\x1b[4m${text}\x1b[0m`;
}

function bold(text) {
  return `\x1b[1m${text}\x1b[0m`;
}

function lineBreak() {
  console.log('\n' + '-'.repeat(75) + '\n');
}

function updateScore(didWin, score) {
  return didWin ? score[0]++ : score[1]++;
}

function showHint(word) {
  console.log(italic(`Hint: The word starts with '${word[0].toUpperCase()}' and has ${word.length} letters.`));
}

function displayWinMessage() {
  lineBreak();
  console.log(green(bold('🎉 Congratulations! 🎉')));
  console.log(green('You guessed the word correctly! Great job!'));
  lineBreak();
}

function displayLoseMessage(word) {
  lineBreak();
  console.log(red(bold('💀 Oops!')));
  console.log(red(`You lose! The correct word was ${underline(bold(word.toUpperCase()))}`));
  console.log(yellow(`Better luck next time!`));
  lineBreak();
}


function generateRandomNumber(startOfRange, endOfRange) {
  const random = Math.random();
  return Math.floor(random * (endOfRange - startOfRange) + startOfRange);
}

function randomChar(word) {
  return word.splice(generateRandomNumber(0, word.length), 1);
}

function getWord() {
  const word = WORDS[generateRandomNumber(0, WORDS.length)];
  return word;
}

function shuffleWord(currentWord) {
  const letters = currentWord.split('');
  const shuffled = [];

  while (letters.length > 0) {
    shuffled.push(randomChar(letters));
  }

  return shuffled.join('');
}

function startGame() {
  const currentWord = getWord();
  const shuffledWord = shuffleWord(currentWord);

  console.log(`${magenta(`🔤 Shuffled word:`)} ${bold(shuffledWord)}`);

  const wantsHint = confirm(cyan('💡 Do you want a hint?'));
  if (wantsHint) {
    showHint(currentWord);
  }

  const guess = prompt(yellow('\n💬 Your guess:\n')).toLowerCase();

  if (currentWord === guess) {
    updateScore(true, score);
    return displayWinMessage();
  }

  updateScore(false, score);
  return displayLoseMessage(currentWord);
}

function description() {
  console.clear();
  console.log(cyan(bold('\n\t\t Welcome to SHUFFLE WORLD! \n')));
  console.log(`  ${yellow(`${italic('Unscramble the shuffled word and type your guess.')}`)}
  ${yellow('If you guess it correctly, you win! If not, don’t worry—you can try again!')}`);
  lineBreak();
}

function main() {
  description();
  startGame();

  while (confirm(blue("🔁 Do you want to play again?"))) {
    console.clear();
    startGame();
  }

  lineBreak();
  console.log(green(`🏁 Final Score: ${score[0]} Wins | ${score[1]} Losses`));
  console.log(green('\n👋 Thanks for playing Shuffle World! See you next time!\n'));
}

main();
