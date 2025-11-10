const uniqueElements = (data, element) => {
  if (!data.includes(element)) {
    data.push(element);
  }

  return data;
};

const reverse = (reversed, element) => {
  reversed.unshift(element);
  return reversed;
};

const frequency = (occurrences, element) => {
  const occurrence = occurrences.find((x) => x[0] === element);

  if (occurrence !== undefined) {
    occurrence[1] += 1;
    return occurrences;
  }

  occurrences.push([element, 1]);

  return occurrences;
};

// ### 1. Festival Ribbon Count
// A craft booth cuts ribbons of different colors throughout the day.
// They want to know how many **blue** ribbons were cut.
const q1 = ["red", "blue", "red", "green", "red", "blue"];
const numberOfBlueRibbons = q1.reduce(
  (count, colour) => colour === "blue" ? count + 1 : count,
  0,
);
console.log("1.", numberOfBlueRibbons);

// ### 2. Stargazing Log
// A stargazing club logs visible constellations from each night.
// Combine everyone’s observations into one list of all constellations spotted.
const q2 = [["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]];
const listConstellations = q2.flatMap((x) => x);
console.log("2.", listConstellations);

// ### 3. Birdwatching Duplicate Removal
// A birdwatcher notes species seen during a morning walk.
// Create a list of the species without repeats, preserving the order first seen.
const q3 = ["sparrow", "crow", "sparrow", "eagle", "crow"];
const uniqueSpecies = q3.reduce(uniqueElements, []);
console.log("3.", uniqueSpecies);

// ### 4. Classroom Attendance Check
// A class records names of students present for each period.
// Determine which distinct students attended at least once.
const q4 = [["Asha", "Ravi", "Neel"], ["Ravi"], ["Asha", "Meera"]];
const distinctStudents = q4
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("4.", distinctStudents);

// ### 5. Candy Jar Stocking
// A store logs candy refills like this. Find the total number of candies added.
const q5 = [[5, 3], [2], [4, 1]];
const totalCandies = q5
  .flatMap((x) => x)
  .reduce((sum, candies) => sum + candies, 0);

console.log("5.", totalCandies);

// ### 6. Music Rehearsal Notes
// Choir groups practice with sequences. Check whether **any** group sang `"do"`.
const q6 = [["mi", "fa", "so"], ["do", "mi"], ["fa"]];
const hasDoNote = q6
  .flatMap((x) => x)
  .some((note) => note === "do");

console.log("6.", hasDoNote);

// ### 7. Weather Sensor Validation
// Several temperature sheets. Check if **every** recorded temperature is below 32.
const q7 = [[22, 23], [25, 24, 22], [29]];
const validateTemperatures = q7
  .flatMap((x) => x)
  .every((x) => x < 32);

console.log("7.", validateTemperatures);

// ### 8. Fitness Tracker Miles
// Runner logs. Find the total miles run.
const q8 = [[2, 3, 2], [4], [1, 1]];
const getTotalMiles = q8
  .flatMap((x) => x)
  .reduce((sum, miles) => sum + miles, 0);

console.log("8.", getTotalMiles);

// ### 9. Art Workshop Color Variety
// Paint colors used in sessions. Find unique colors used.
const q9 = [["blue", "yellow"], ["yellow", "green"], ["blue"]];
const uniqueColors = q9
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("9.", uniqueColors);

// ### 10. Library Return Counter
// Books returned. Count how many times “Dune” was returned.
const q10 = ["Dune", "Dune", "Foundation", "Dune"];
const numberOfDune = q10.reduce(
  (count, word) => word === "Dune" ? count + 1 : count,
  0,
);
console.log("10.", numberOfDune);

// ### 11. Lunchbox Ingredient Inventory
// Lists of ingredients. Produce a list of distinct ingredients.
const q11 = [["rice", "lentils"], ["rice"], ["curd", "lentils"]];
const unoqueIngredients = q11
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("11.", unoqueIngredients);

// ### 12. Choir Harmony Review
// Singers produce sequences. Check whether any group sang `"so"`.
const q12 = [["la", "la"], ["mi"], ["so", "la"]];
const isIncludeSo = q12
  .flatMap((x) => x)
  .some((note) => note === "so");

console.log("12.", isIncludeSo);

// ### 13. Vegetable Crate Totals
// Crate weights. Find the sum of all weights.
const q13 = [[4, 6], [2, 3, 1], [5]];
const totalWeight = q13
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("13.", totalWeight);

// ### 14. Post Office Parcel Record
// Parcel sizes logged. Find unique parcel sizes.
const q14 = ["small", "large", "medium", "small"];
const uniqueParcelSize = q14.reduce(uniqueElements, []);
console.log("14.", uniqueParcelSize);

// ### 15. Wildlife Sighting Count
// Animal sightings. Count how many times “deer” was seen.
const q15 = ["deer", "deer", "rabbit", "deer"];
const deerWasSeenInTime = q15.reduce(
  (count, animal) => animal === "deer" ? count + 1 : count,
  0,
);
console.log("15.", deerWasSeenInTime);

// ### 16. Study Group Completion
// Study groups finish chapters. Find all chapters completed by any group.
const q16 = [[1, 2], [3], [2, 4, 1]];
const completedChapter = q16
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("16.", completedChapter);

// ### 17. Dance Class Steps
// Step sequences. Check if `"turn"` appears in any sequence.
const q17 = [["step", "tap"], ["turn", "step"]];
const isTurnAppear = q17
  .flatMap((x) => x)
  .some((x) => x === "turn");

console.log("17.", isTurnAppear);

// ### 18. Garden Watering Amount
// Water used. Total amount of water used.
const q18 = [[1, 2, 1], [3], [2]];
const totalAmountOfWater = q18
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("18.", totalAmountOfWater);

// ### 19. Paper Crane Making
// Origami students make cranes in sessions. Compute the total cranes.
const q19 = [[3, 2], [1], [4]];
const totalCranes = q19
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("19.", totalCranes);

// ### 20. Fruit Basket Inventory
// Mixed fruits recorded. List unique fruits used.
const q20 = [["apple", "banana"], ["apple"], ["apple", "orange"]];
const uniqueFruits = q20
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("20.", uniqueFruits);

// ### 21. Classroom Pen Distribution
// Pens given. Total pens handed out.
const q21 = [[2, 3], [1], [3, 2]];
const totalPens = q21
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("21.", totalPens);

// ### 22. Movie Marathon Titles
// Movies watched. List unique titles watched.
const q22 = [["Inception", "Dunkirk"], ["Interstellar"], ["Inception"]];
const uniqueMovies = q22
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("22.", uniqueMovies);

// ### 23. Name Badge Sorting
// Students sign in repeatedly. Create a unique list of attendees.
const q23 = ["A", "B", "A", "C", "B"];
const uniqueAttendees = q23.reduce(uniqueElements, []);
console.log("23.", uniqueAttendees);

// ### 24. Ice Cream Orders
// Orders recorded. Find how many orders were `"chocolate"`.
const q24 = ["vanilla", "chocolate", "strawberry", "chocolate"];
const totalChocolateOrder = q24.reduce(
  (count, iceCream) => iceCream === "chocolate" ? count + 1 : count,
  0,
);
console.log("24.", totalChocolateOrder);

// ### 25. Flowers in Bouquets
// Bouquets contain. List all unique flowers used.
const q25 = [["rose", "lily"], ["lily", "tulip"]];
const uniqueFlowers = q25
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("25.", uniqueFlowers);

// ### 26. Morning Exercise Count
// Repetitions. Total repetitions done.
const q26 = [[10, 20], [5], [15, 10]];
const totalRepetitions = q26
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("26.", totalRepetitions);

// ### 27. Train Station Announcements
// Stations announced. Find the station names without repeats.
const q27 = [["A", "B"], ["B", "C"], ["A"]];
const uniqueStations = q27
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("27.", uniqueStations);

// ### 28. Book Club Pages Read
// Groups read pages. Find total pages read.
const q28 = [[12, 10], [5], [8, 7]];
const totalPagesRead = q28
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("28.", totalPagesRead);

// ### 29. Rainfall Data Check
// Measurements. Check if all values are positive.
const q29 = [[3, 4], [5, 2], [1]];
const areAllPositive = q29
  .flatMap((x) => x)
  .every((x) => x > 0);

console.log("29.", areAllPositive);

// ### 30. Fruit Stand Weight Totals
// Weights. Compute total weight.
const q30 = [[4, 3], [2], [3, 1]];
const totalWeightOfFruits = q30
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("30.", totalWeightOfFruits);

// ### 31. School Snack List
// Snacks. Unique snacks served.
const q31 = [["idli", "vada"], ["vada", "upma"]];
const uniqueSnacks = q31
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("31.", uniqueSnacks);

// ### 32. Photo Contest Entries
// Photographers submit sets. List unique themes.
const q32 = [["sunset", "bird"], ["river"], ["sunset"]];
const uniqueThemes = q32
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("32.", uniqueThemes);

// ### 33. Electricity Reading Validation
// Readings. Check if all readings are below 120.
const q33 = [[110, 115], [118], [109]];
const areAllBelow120 = q33
  .flatMap((x) => x)
  .every((x) => x < 120);

console.log("33.", areAllBelow120);

// ### 34. Jogging Lap Count
// Laps. Compute total laps.
const q34 = [[2, 3, 2], [1], [4]];
const totalLaps = q34
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("34.", totalLaps);

// ### 35. Music Playlist Repeats
// Songs played. Count occurrences of `"track1"`.
const q35 = ["track1", "track2", "track1"];
const occurrencesOfTrack1 = q35.reduce(
  (count, track) => track === "track1" ? count + 1 : count,
  0,
);
console.log("35.", occurrencesOfTrack1);

// ### 36. Café Order Ingredients
// Ingredients. Unique ingredients needed.
const q36 = [["cheese", "bread"], ["tomato"], ["bread"]];
const uniqueIngredients = q36
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("36.", uniqueIngredients);

// ### 37. Student Poetry Words
// Word lists. List all unique words.
const q37 = [["sky", "blue"], ["night"], ["sky", "dark"]];
const uniqueWords = q37
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("37.", uniqueWords);

// ### 38. Gift Box Items
// Items. List unique items used.
const q38 = [["toy", "sticker"], ["candy", "sticker"]];
const uniqueGiftItems = q38
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("38.", uniqueGiftItems);

// ### 39. Gym Routine Count
// Routine counts. Total counts.
const q39 = [[6, 4], [3, 2]];
const totalCount = q39
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("39.", totalCount);

// ### 40. Fish Tank Measurements
// Measurements. Check if any measurement is above 7.
const q40 = [[5, 6], [7], [6]];
const isAnyAbove7 = q40
  .flatMap((x) => x)
  .some((x) => x < 7);

console.log("40.", isAnyAbove7);

// ### 41. Candy Distribution
// Candy numbers. Sum all candies.
const q41 = [[1, 2, 3], [2]];
const sumOfAllCandies = q41
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("41.", sumOfAllCandies);

// ### 42. Workshop Attendance
// Participants. List unique participants.
const q42 = [["Tom", "Jerry"], ["Jerry", "Spike"]];
const uniqueParticipants = q42
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("42.", uniqueParticipants);

// ### 43. Space Camp Star Names
// Stars named. Unique star names.
const q43 = [["Vega", "Sirius"], ["Vega", "Rigel"]];
const uniqueStars = q43
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("43.", uniqueStars);

// ### 44. Train Car Passenger Check
// Counts. Total passengers.
const q44 = [[10, 12], [15]];
const totalPassengers = q44
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("44.", totalPassengers);

// ### 45. Weekly Grocery Tally
// Quantities. Find the total.
const q45 = [[3, 5], [2, 1]];
const totalWeeklyGrocery = q45
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("45.", totalWeeklyGrocery);

// ### 46. Tea Tasting Flavors
// Flavors. Unique flavors.
const q46 = [["mint", "ginger"], ["lemon"], ["mint"]];
const uniqueFlavour = q46
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("46.", uniqueFlavour);

// ### 47. Photography Exposure Values
// Values. Check if any value equals 4.
const q47 = [[2, 3], [1], [4, 2]];
const isAnyValue4 = q47
  .flatMap((x) => x)
  .some((x) => x === 4);

console.log("47.", isAnyValue4);

// ### 48. Drawing Class Tools
// Tools. Unique tools used.
const q48 = [["pencil", "charcoal"], ["ink"], ["pencil"]];
const uniqueToolsUsed = q48
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("48.", uniqueToolsUsed);

// ### 49. Coin Collection Tally
// Coins collected. Total coins.
const q49 = [[1, 1, 2], [2, 1]];
const totalCoins = q49
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("49.", totalCoins);

// ### 50. Cooking Class Spices
// Spices. Unique spices.
const q50 = [["salt", "pepper"], ["turmeric"], ["salt"]];
const uniqueSpices = q50
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("50.", uniqueSpices);

// ### 51. Fruit Log Count
// Count how many times “banana” appears in a fruit log.
const q51 = ["apple", "banana", "banana", "grapes"];
const numberOfBanana = q51.reduce(
  (count, fruit) => fruit === "banana" ? count + 1 : count,
  0,
);
console.log("51.", numberOfBanana);

// ### 52. Worksheet Words Combination
// Combine all words written by students on three worksheets.
const q52 = [["sky", "air"], ["water"], ["fire"]];
const combinedWords = q52.flatMap((x) => x);
console.log("52.", combinedWords);

// ### 53. Word "Excellent" Check
// Determine whether any student wrote the word “excellent”.
const q53 = [["nice"], ["excellent", "good"], ["nice"]];
const haveAnyoneWriteExcellent = q53
  .flatMap((x) => x)
  .some((word) => word === "excellent");

console.log("53.", haveAnyoneWriteExcellent);

// ### 54. Rainfall Cap Validation
// Check whether all recorded rainfall values are under 50.
const q54 = [[20, 30], [40, 31], [54]];
const areAllUnder50 = q54
  .flatMap((x) => x)
  .every((x) => x < 50);

console.log("54.", areAllUnder50);

// ### 55. Unique Movie Genres
// Produce a list of unique movie genres mentioned by a club.
const q55 = [["comedy", "horror"], ["horror"], ["romance", "thriller"]];
const uniqueMovieGenres = q55
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("55.", uniqueMovieGenres);

// ### 56. Pushup Total
// Compute the total number of pushups done in all sessions.
const q56 = [[1, 2], [1, 3, 6], [3]];
const totalPushups = q56
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("56.", totalPushups);

// ### 57. Unique Bird Species
// Create a list of all unique bird species spotted on a trip.
const q57 = ["sparrow", "crow", "sparrow", "eagle", "crow"];
const uniqueBirds = q57.reduce(uniqueElements, []);
console.log("57.", uniqueBirds);

// ### 58. Red Tile Count
// Count how many tiles in a mosaic were listed as “red”.
const q58 = ["red", "red", "white", "black"];
const numberOfRedTiles = q58.reduce(
  (count, tile) => tile === "red" ? count + 1 : count,
  0,
);
console.log("58.", numberOfRedTiles);

// ### 59. Cycling Distance Sum
// Sum all distances covered during cycling practice.
const q59 = [[12, 12], [14, 10]];
const totalDistances = q59
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("59.", totalDistances);

// ### 60. Unique Ice Cream Flavors
// List unique flavors tried in an ice-cream tasting event.
const q60 = ["vanilla", "chocolate", "strawberry", "chocolate"];
const uniqueIceCreamFlavours = q60.reduce(uniqueElements, []);
console.log("60.", uniqueIceCreamFlavours);

// ### 61. High Score Check
// Check if any participant scored above 90 in tests.
const q61 = [90, 54, 45, 17];
const isAnyScoreAbove90 = q61.some((x) => x > 90);
console.log("61.", isAnyScoreAbove90);

// ### 62. Age Restriction Validation
// Verify if all ages listed for an event are 18 or above.
const q62 = [18, 19, 52, 32, 32];
const areAllAdult = q62.every((x) => x >= 18);
console.log("62.", areAllAdult);

// ### 63. Combined Recipe Ingredients
// Combine the ingredients from all recipe attempts.
const q63 = [["cheese", "bread"], ["tomato"], ["bread"]];
const combinedIngredients = q63.flatMap((x) => x);
console.log("63.", combinedIngredients);

// ### 64. Reverse Dance Steps
// Reverse the order of dance steps recorded by a choreographer.
const q64 = ["step", "tap", "turn", "step"];
const reversedSteps = q64.reduce(reverse, []);
console.log("64.", reversedSteps);

// ### 65. Word Frequency Summary
// Build a frequency summary of words used in a poem draft.
const q65 = [
  "jhony",
  "jhony",
  "yes",
  "papa",
  "eating",
  "sugar",
  "no",
  "papa",
  "telling",
  "lie",
  "no",
  "papa",
  "open",
  "your",
  "mouth",
  "ha",
  "ha",
  "ha",
];
const frequencyOfWords = q65.reduce(frequency, []);
console.log("65.", frequencyOfWords);

// ### 66. Note "Fa" Check
// Determine whether the note “fa” appears in any music sheet.
const q66 = [["fa", "ke"], ["sa"], ["re", "ga"]];
const isFaAppears = q66
  .flatMap((x) => x)
  .some((note) => note === "fa");

console.log("66.", isFaAppears);

// ### 67. Parcel Weight Sum
// Sum all weights of parcels recorded in a courier office.
const q67 = [[12, 23], [3, 54], [21, 32, 54]];
const totalWeightOfParcels = q67
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("67.", totalWeightOfParcels);

// ### 68. Distinct Pizza Toppings
// List distinct toppings chosen by pizza customers.
const q68 = [["onion", "pineapple"], ["potato", "onion"], ["tomato"]];
const uniqueToppings = q68
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("68.", uniqueToppings);

// ### 69. Chapter Reread Count
// Count how many times a student reread a particular chapter.
const q69 = [2, 1, 3, 4, 5];
const numberOfReread = q69.reduce((x, y) => x + y, 0);
console.log("69.", numberOfReread);

// ### 70. Combine Color Swatches
// Combine all color swatches from three design sets.
const q70 = [["black", "white"], ["red"], ["pink"]];
const combinedColorSwatches = q70.flatMap((x) => x);
console.log("70.", combinedColorSwatches);

// ### 71. Maximum Threshold Check
// Check if any experiment reading hit the maximum threshold of 100.
const q71 = [[23, 4], [191, 53], [73]];
const isAnyThresholdHit100 = q71
  .flatMap((x) => x)
  .some((x) => x >= 100);

console.log("71.", isAnyThresholdHit100);

// ### 72. Completion Verification
// Verify whether every participant completed at least one task.
const q72 = [1, 2, 7, 0, 2];
const isCompletedAtleastOne = q72.every((x) => x > 0);
console.log("72.", isCompletedAtleastOne);

// ### 73. Unique Travel Destinations
// List unique destinations chosen in a travel club survey.
const q73 = [["pak", "agf"], ["ind", "ban"], ["aus", "eng", "ind"]];
const uniqueDestination = q73
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("73.", uniqueDestination);

// ### 74. Instrument Practice Sum
// Sum all hours spent practicing an instrument.
const q74 = [[2, 1, 3], [4, 2], [1]];
const totalHours = q74
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("74.", totalHours);

// ### 75. Distinct Plant Types
// Find all distinct types of plants noted during fieldwork.
const q75 = [["tree", "herb"], ["tree"], ["fern", "tree"]];
const uniquePlants = q75
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("75.", uniquePlants);

// ### 76. Specific Sound Occurrence Count
// Count occurrences of a specific sound in a phonetics study.
const q76 = ["s1", "s2", "s1", "s3", "s2", "s1"];
const occurrencesOfSounds = q76.reduce(frequency, []);
console.log("76.", occurrencesOfSounds);

// ### 77. Combined Syllables
// Combine all syllables used in language drills.
const q77 = [["sl1", "sl2"], ["sl3"], ["sl4"]];
const combinedSyllables = q77.flatMap((x) => x);
console.log("77.", combinedSyllables);

// ### 78. Zero Measurement Check
// Check if any measurement is exactly zero.
const q78 = [[2, 3], [2, 0], [1]];
const isAnyExactly0 = q78
  .flatMap((x) => x)
  .some((x) => x === 0);

console.log("78.", isAnyExactly0);

// ### 79. Weight Limit Validation
// Verify that all listed items weigh less than 10 grams.
const q79 = [[5, 2], [5, 4], [9, 1]];
const isAllLessThan10 = q79
  .flatMap((x) => x)
  .every((x) => x < 10);

console.log("79.", isAllLessThan10);

// ### 80. Color Frequency Summary
// Summarize how many times each color appears in a creative art project.
const q80 = [["black", "white"], ["red", "black"], ["white", "red"]];
const frequencyOfColors = q80
  .flatMap((x) => x)
  .reduce(frequency, []);

console.log("80.", frequencyOfColors);

// ### 81. Reverse Instructions
// Reverse the order of instructions written for a scavenger hunt.
const q81 = ["leaf", "rock", "shell", "book"];
const reversedOrder = q81.reduce(reverse, []);
console.log("81.", reversedOrder);

// ### 82. Journal Mention Count
// Count how many entries in a journal mention “rain”.
const q82 = [["rain", "sun"], ["human"], ["rain", "red"]];
const totalRedEntries = q82
  .flatMap((x) => x)
  .reduce((count, colour) => colour === "rain" ? count + 1 : count, 0);

console.log("82.", totalRedEntries);

// ### 83. Merge Poetry Fragments
// Merge all small poetry fragments into one list of lines.
const q83 = [
  ["rain", "rain", "go", "away"],
  ["come", "again"],
  ["another", "day"],
  ["jhony", "jhony"],
  ["yes", "papa"],
];

const mergedfragments = q83.map((words) => words.join(" "));
console.log("83.", mergedfragments);

// ### 84. Unique Cartoon Characters
// List unique cartoon characters favored by children.
const q84 = [["bheem"], ["oggy", "olivia"], ["jack", "olivia"], ["olivia"]];
const uniqueCharacters = q84
  .flatMap((x) => x)
  .reduce(uniqueElements, []);

console.log("84.", uniqueCharacters);

// ### 85. Total Points Scored
// Add up all points scored by a team across multiple games.
const q85 = [[1, 2], [2, 3], [3, 4]];
const totalScore = q85
  .flatMap((x) => x)
  .reduce((x, y) => x + y, 0);

console.log("85.", totalScore);

// ### 86. Exact Score Check
// Check whether any team scored exactly 50 points.
const q86 = [12, 23, 34, 50];
const isExactly50 = q86.some((x) => x === 50);
console.log("86.", isExactly50);

// ### 87. pH Value Validation
// Ensure all pH values recorded are below 8.
const q87 = [1.2, 3.2, 1, 7, 3];
const arePhBelow8 = q87.every((x) => x < 8);
console.log("87.", arePhBelow8);

// // ### 88. Unique Chocolate Flavors
// // Count unique flavors tasted in a chocolate workshop.
// const q88 =
// const a88 = q88
// console.log("88.", a88);

// // ### 89. Meditation Time Sum
// // Sum all minutes of meditation logged across sessions.
// const q89 =
// const a89 = q89
// console.log("89.", a89);

// // ### 90. Unique Repair Tools
// // Identify every unique tool used in a repair workshop.
// const q90 =
// const a90 = q90
// console.log("90.", a90);

// // ### 91. White Shirt Count
// // Count how many shirts in a laundry batch were listed as “white”.
// const q91 =
// const a91 = q91
// console.log("91.", a91);

// // ### 92. Combined Meeting Notes
// // Combine all notes written during a meeting into one list.
// const q92 =
// const a92 = q92
// console.log("92.", a92);

// // ### 93. "Fragile" Item Check
// // Check if any item in a shipment is marked “fragile”.
// const q93 =
// const a93 = q93
// console.log("93.", a93);

// // ### 94. Lowercase Letter Validation
// // Verify that all letters written by participants are lowercase.
// const q94 =
// const a94 = q94
// console.log("94.", a94);

// // ### 95. Reverse Chess Moves
// // Reverse a list of moves recorded during a chess game.
// const q95 =
// const a95 = q95
// console.log("95.", a95);

// // ### 96. Musical Note Frequency
// // Build a frequency list for musical notes practiced in a session.
// const q96 =
// const a96 = q96
// console.log("96.", a96);

// // ### 97. Error Message Count
// // Count the number of times “error” appears in a log of messages.
// const q97 =
// const a97 = q97
// console.log("97.", a97);

// // ### 98. Gather All Ingredients
// // Gather all ingredients used in three versions of the same dish.
// const q98 =
// const a98 = q98
// console.log("98.", a98);

// // ### 99. Skipped Activity Check
// // Check if any student skipped all activity sessions.
// const q99 =
// const a99 = q99
// console.log("99.", a99);

// // ### 100. Distinct Hummed Songs
// // Create a list of distinct songs hummed by children on a bus ride.
// const q100 =
// const a100 = q100
// console.log("100.", a100);

// Write a function that can take an array of sentences and return all the words that start with 'a' (regardless of case)
// const sentences = [
//   'just a phrase',
//   'also another phrase',
//   'arbitrary phrase',
//   'An interesting phrase'
// ];

// Output:

// [ "a", "also", "another", "arbitrary", "An" ]
