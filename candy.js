// A page that generates fictional British sweets on demand.
// Live example: https://ezra.codes/

// DOM setup
const generatorButtonElement = document.querySelector('.generator');
const nameElement = document.querySelector('.generated-name');
generatorButtonElement.addEventListener('click', generateAndDisplay(nameElement));

function generateAndDisplay(element) {
  return (e) => {
    element.innerText = candy();
  }
}

/**
 * Picks a named item from an array of weighted items.
 * 
 * Math.random() generates a random Number in [0, 1).
 * Multiply this by the sum of all weights to get a 'threshold' number in [0, totalWeight).
 * Iterate through the elements, subtracting the weight of each element from the threshold.
 * The first element with a weight greater than the current threshold is selected.
 * 
 * @param {Array<{name: String, weight: Number}>} weightedArray 
 * @returns {String}
 */ 
function getRandomWeightedItem(weightedArray) {
  const totalWeight = weightedArray.reduce((weights, {weight}) => weights += weight, 0);

  let threshold = Math.random() * totalWeight;

	for (let {name, weight} of weightedArray) {
		if (threshold < weight) { return name; }
		threshold -= weight;
	}
}

// A test to make sure the random weighted item getter gets with roughly proper probability.
// Call this on the console with one of the pools defined below.
function testGetRWI(weightedArray, runCount = 1000) {
  const results = {};
  for (let i = 0; i < runCount; i++) {
    const item = getRandomWeightedItem(weightedArray);
    if (results[item]) {
      results[item]++
    } else {
      results[item] = 1;
    }
  }

  const totalWeight = weightedArray.reduce((weights, {weight}) => weights += weight, 0);

  const metrics = weightedArray.map((element) => {
    element.proportion = parseFloat((element.weight / totalWeight).toFixed(4));
    element.expected = Math.trunc(element.proportion * runCount);
    element.actual = results[element.name];
    return element;
  })

  console.log(`Result of ${runCount} runs:`);
  console.log(metrics);
}


// Weighted distributions of name components
const brandPool = [
  { name: "Cadbury", weight: 10 },
  { name: "Nestle", weight: 5 },
  { name: "Tesco Select", weight: 3 },
  { name: "Rowntree's", weight: 2 },
  { name: "Tunnock's", weight: 2 },
  { name: "Yorkshire", weight: 2 },
  { name: "His Majesty's", weight: 1 },
];

const adjectivePool = [
  { name: "Sweet", weight: 4 },
  { name: "Fruity", weight: 4 },
  { name: "Minty", weight: 4 },
  { name: "Milky", weight: 3 },
  { name: "Sticky", weight: 3 },
  { name: "Chewy", weight: 2 },
  { name: "Royal", weight: 2 },
  { name: "Turkish", weight: 1 },
  { name: "Scrumptious", weight: 1 },
  { name: "Smucky", weight: 1 },
  { name: "Jolly Good", weight: 1 },
  { name: "Bumptious", weight: 1 },
  { name: "Wibbly-wobbly", weight: 1 },
];

const ingredientsPool = [
  { name: 'Chocolate', weight: 4 },
  { name: 'Fruit', weight: 2 },
  { name: 'Mint', weight: 2 },
  { name: 'Choco', weight: 1 },
  { name: 'Nougat', weight: 1 },
  { name: 'Caramel', weight: 1 },
  { name: 'Toffee', weight: 1 },
  { name: 'Jelly', weight: 1 },
];

const postpositivePool = [
  { name: 'Duo', weight: 3 },
  { name: 'Junior', weight: 2 },
  { name: 'Deluxe', weight: 2 },
  { name: 'XL', weight: 2 },
  { name: 'Black Label', weight: 1 },
];

const prefixPool = [
  { name: 'Scr', weight: 1 },
  { name: 'J', weight: 1 },
  { name: 'B', weight: 1 },
  { name: 'W', weight: 1 },
  { name: 'H', weight: 1 },
  { name: 'Ch', weight: 1 },
  { name: 'Cr', weight: 1 },
  { name: 'P', weight: 1 },
  { name: 'T', weight: 1 },
  { name: 'Gr', weight: 1 },
  { name: 'Gl', weight: 1 },
  { name: 'Fl', weight: 1 },
  { name: 'Sp', weight: 1 },
];

const nucleus1Pool = [
  { name: 'oof', weight: 1 },
  { name: 'oot', weight: 1 },
  { name: 'oop', weight: 1 },
  { name: 'ugg', weight: 1 },
  { name: 'iff', weight: 1 },
  { name: 'eff', weight: 1 },
  { name: 'uff', weight: 1 },
  { name: 'off', weight: 1 },
  { name: 'aff', weight: 1 },
  { name: 'umb', weight: 1 },
  { name: 'unch', weight: 1 },
  { name: 'omp', weight: 1 },
  { name: 'imp', weight: 1 },
  { name: 'ogg', weight: 1 },
  { name: 'egg', weight: 1 },
];

const nucleus2Pool = [
  { name: 'eld', weight: 1 },
  { name: 'elt', weight: 1 },
  { name: 'er', weight: 1 },
];

const nucleus3Pool = [
  { name: 'umbeld', weight: 3 },
  { name: 'ippit', weight: 1 },
];

const adjectiveEndingPool = [
  { name: 'ly', weight: 2 },
  { name: 'y', weight: 2 },
  { name: 'le', weight: 1 },
  { name: 'er', weight: 1 },
];

const nounSimpleEndingPool = [
  { name: 'le', weight: 1 },
  { name: 'les', weight: 1 },
  { name: 'ers', weight: 1 },
  { name: 'ets', weight: 1 },
  { name: 'lets', weight: 1 },
  { name: 'ies', weight: 1 },
  { name: 'ries', weight: 1 },
];

const nounCompoundEndingPool = [
  { name: 'cakes', weight: 1 },
  { name: 'bars', weight: 1 },
  { name: 'crisps', weight: 1 },
  { name: 'crumpets', weight: 1 },
  { name: 'noughts', weight: 1 },
  { name: 'scotches', weight: 1 },
  { name: 'babies', weight: 1 },
  { name: 'chews', weight: 1 },
];


// Candy name generator
function candy() {  
  return brand() + adjective() + ingredients() + britishism() + postpositive();
}

// Randomly returns string of 0-1 brand names
function brand() {
  let result = '';
  if (Math.random() > .6) {
    result += getRandomWeightedItem(brandPool) + ' ';
  }

  return result;
}

// Randomly returns string of 0-2 adjectives
function adjective() {
  const selector = Math.random();
  let result = '';
  if (selector > .6) {
    result += getRandomWeightedItem(adjectivePool) + ' ';
    if (selector > .9) {
      result += 'and ' + getRandomWeightedItem(adjectivePool) + ' ';
    }
  }
  
  return result;
}

// Randomly returns string of 0-2 ingredients
function ingredients() {
  const selector = Math.random();
  let result = '';
  if (selector > .35) {
    result += getRandomWeightedItem(ingredientsPool) + ' ';
    if (selector > .8) {
      result += getRandomWeightedItem(ingredientsPool) + ' ';
    }
  }

  return result;
}


// Randomly returns string of 0-1 postpostives
function postpositive() {
  let result = '';
  if (Math.random() > .8) {
    result += ' ' + getRandomWeightedItem(postpositivePool);
  }
  
  return result;
}

// Returns string of 1-3 British-sounding nonsense words
function britishism() {
  const selector = Math.random();
  
  let result = '';
  if (selector > .55) {
    result += britishismWord('adjective') + ' ';
      if (selector > .85) {
        result += britishismWord('adjective') + ' ';
      }
  }
  result += britishismWord('noun');

  return result;
}

/**
 * Returns string of 1 British-sounding nonsense word.
 * Words are built from hand-picked morphemes and consist of:
 *   1 prefix + 1-3 nuclei + 1 ending
 * Words may be rhymingly repeated, e.g. "Curly Wurly".
 * 
 * @param {('noun'|'adjective')} nounOrAdjective 
 * @returns {String}
 */
function britishismWord(nounOrAdjective) {
  let word = '';

  let nucleus2, nucleus3
  if (Math.random() > .69) { nucleus2 = true; }
  if (nucleus2 && Math.random() > .83) { nucleus3 = true; }

  // save prefix; if repeating the word, it will be sliced off and replaced
  const prefix = getRandomWeightedItem(prefixPool);
  word += prefix;

  word += getRandomWeightedItem(nucleus1Pool);

  if (nucleus2) { word += getRandomWeightedItem(nucleus2Pool); }
  if (nucleus3) { word += getRandomWeightedItem(nucleus3Pool); }

  if (nounOrAdjective === 'adjective') {
    word += getRandomWeightedItem(adjectiveEndingPool);
  }
  
  if (nounOrAdjective === 'noun') {
    if (Math.random() > .55) {
      word += getRandomWeightedItem(nounSimpleEndingPool);
    } else {
      word += getRandomWeightedItem(adjectiveEndingPool);
      word += getRandomWeightedItem(nounCompoundEndingPool);
    }
  }

  // Adjust repetition frequency based on word properties
  let repeat = false;
  let repeatThreshold = .8;
  if (nucleus2) { repeatThreshold += .1; }
  if (nucleus3) { repeatThreshold -= .1; }
  if (nounOrAdjective === 'noun') { repeatThreshold += .05; }
  if (Math.random() > repeatThreshold) { repeat = true; }

  // Adds a rhymed word
  if (repeat) {
    const lastLetter = word.slice(-1);
    if (nounOrAdjective === 'noun' && lastLetter === 's') {
      word = word.slice(0, -1);
    }

    let rhymedWord = ' ' + getRandomWeightedItem(prefixPool);
    rhymedWord += word.substring(prefix.length);
    word += rhymedWord;
    
    if (nounOrAdjective === 'noun' && lastLetter === 's') {
      word += 's';
    }
  }

  // Replace awkward letter formations
  word = word.replaceAll('eldle',  'le');
  word = word.replaceAll('eltle',  'elty');
  word = word.replaceAll('erle',  'er');

  return word;
}