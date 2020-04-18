// https://github.com/ebertucc/british-candy

// DOM setup
const generatorButtonElement = document.querySelector('.generator')
const nameElement = document.querySelector('.generated-name')
generatorButtonElement.addEventListener('click', generateAndDisplay(nameElement))
function generateAndDisplay(element) {
  return (e) => {
    element.innerText = candy()
  }
}

// Uses discrete cumulative density function
// See https://stackoverflow.com/questions/41418689/get-random-element-from-array-with-weighted-elements
function getRandomWeightedItem(weightedArray) {
	let totalWeight = 0

	for (let weightedElement of weightedArray) {
		totalWeight += weightedElement.weight
	}
  
  let random = Math.random() * totalWeight

	for (let weightedElement of weightedArray) {
		if (random < weightedElement.weight) {
			return weightedElement.name
		}
		random -= weightedElement.weight
	}
}

// Weighted distributions of name components
const brandPool = [
  { name: "Cadbury", weight: 10 },
  { name: "Nestle", weight: 5 },
  { name: "Tesco Select", weight: 3 },
  { name: "Rowntree's", weight: 2 },
  { name: "Tunnock's", weight: 2 },
  { name: "Yorkshire", weight: 2 },
  { name: "Her Majesty's", weight: 1 },
]

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
]

const ingredientsPool = [
  { name: 'Chocolate', weight: 4 },
  { name: 'Fruit', weight: 2 },
  { name: 'Mint', weight: 2 },
  { name: 'Choco', weight: 1 },
  { name: 'Nougat', weight: 1 },
  { name: 'Caramel', weight: 1 },
  { name: 'Toffee', weight: 1 },
  { name: 'Jelly', weight: 1 },
]

const postpositivePool = [
  { name: 'Duo', weight: 3 },
  { name: 'Junior', weight: 2 },
  { name: 'Deluxe', weight: 2 },
  { name: 'XL', weight: 2 },
  { name: 'Black Label', weight: 1 },
]

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
]

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
]

const nucleus2Pool = [
  { name: 'eld', weight: 1 },
  { name: 'elt', weight: 1 },
  { name: 'er', weight: 1 },
]

const nucleus3Pool = [
  { name: 'umbeld', weight: 3 },
  { name: 'ippit', weight: 1 },
]

const adjectiveEndingPool = [
  { name: 'ly', weight: 2 },
  { name: 'y', weight: 2 },
  { name: 'le', weight: 1 },
  { name: 'er', weight: 1 },
]

const nounSimpleEndingPool = [
  { name: 'le', weight: 1 },
  { name: 'les', weight: 1 },
  { name: 'ers', weight: 1 },
  { name: 'ets', weight: 1 },
  { name: 'lets', weight: 1 },
  { name: 'ies', weight: 1 },
  { name: 'ries', weight: 1 },
]

const nounCompoundEndingPool = [
  { name: 'cakes', weight: 1 },
  { name: 'bars', weight: 1 },
  { name: 'crisps', weight: 1 },
  { name: 'crumpets', weight: 1 },
  { name: 'noughts', weight: 1 },
  { name: 'scotches', weight: 1 },
  { name: 'babies', weight: 1 },
  { name: 'chews', weight: 1 },
]


// Candy name generator
function candy() {
  let name = ''
  name += ''
  name += brand()
  name += adjective()
  name += ingredients()
  name += britishism()
  name += postpositive()
  
  return name
}

// Returns 'A ' or ''
function brand() {
  let name = ''
  if (Math.random() > .6) {
    name = getRandomWeightedItem(brandPool) + ' '
  }

  return name
}

// 'A ', 'A and B ', or '' 
function adjective() {
  const randy = Math.random()
  let name = ''
  if (randy > .6) {
    name = getRandomWeightedItem(adjectivePool) + ' '
    if (randy > .9) {
      name += 'and ' + getRandomWeightedItem(adjectivePool) + ' '
    }
  }
  
  return name
}

// Returns 'A ', 'A B ', or ''
function ingredients() {
  const randy = Math.random()
  let name = ''
  if (randy > .35) {
    name = getRandomWeightedItem(ingredientsPool) + ' '
    if (randy > .8) {
      name += getRandomWeightedItem(ingredientsPool) + ' '
    }
  }

  return name
}


// Returns ' A' or ''
function postpositive() {
  let name = ''
  if (Math.random() > .8) {
    name = ' ' + getRandomWeightedItem(postpositivePool)
  }
  
  return name
}

// Returns an authentic British wibbeldy word
function britishism() {
  let adj1, adj2
  if (Math.random() > .55) adj1 = true
  if (adj1 && Math.random() > .55) adj2 = true
  let name = ''
  if (adj1)
    name += britishismWord('adjective') + ' '
  if (adj2)
    name += britishismWord('adjective') + ' '
  name += britishismWord('noun')

  return name
}

function britishismWord(nounOrAdjective) {
  let nucleus2, nucleus3
  if (Math.random() > .69) nucleus2 = true
  if (nucleus2 && Math.random() > .83) nucleus3 = true

  let name = ''
  const prefix = getRandomWeightedItem(prefixPool)
  const prefixLength = prefix.length // for repetition
  name += prefix
  name += getRandomWeightedItem(nucleus1Pool)
  if (nucleus2)
    name += getRandomWeightedItem(nucleus2Pool)
  if (nucleus3)
    name += getRandomWeightedItem(nucleus3Pool)
  if (nounOrAdjective === 'adjective')
    name += getRandomWeightedItem(adjectiveEndingPool)
  if (nounOrAdjective === 'noun') {
    if (Math.random() > .55) {
      name += getRandomWeightedItem(nounSimpleEndingPool)
    } else {
      name += getRandomWeightedItem(adjectiveEndingPool)
      name += getRandomWeightedItem(nounCompoundEndingPool)
    }
  }

  let repeat = false
  let repeatThreshold = .65
  if (nucleus2)
    repeatThreshold += .1 // make 2 nuclei repeat less often
  if (nucleus3)
    repeatThreshold -= .5 // make 3 nuclei repeat *more* often
  if (nounOrAdjective === 'noun')
    repeatThreshold += 2 // make nouns repeat less often 
  if (Math.random() > repeatThreshold) repeat = true

  if (repeat) {
    console.log('hit!')
    const lastLetter = name.slice(-1)
    if (nounOrAdjective === 'noun' && lastLetter === 's') 
      name = name.slice(0, -1)
    let partTwo = ' ' + getRandomWeightedItem(prefixPool)
    partTwo += name.substring(prefixLength)
    name += partTwo
    if (nounOrAdjective === 'noun' && lastLetter === 's')
    name += 's'
  }

  return name
}