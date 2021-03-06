
// * === Disbale Keys in Window ===

window.addEventListener('keydown', function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)


// * === Modals ===

const overlay2 = document.querySelector('#overlay2')

function gameOver() {
  gameOverModal.style.display = 'block'
  const playerScore = document.querySelector('#player-score')
  playerScore.innerHTML = score
  overlay2.style.display = 'block'
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



function gameWon() {
  winModal.style.display = 'block'
  overlay2.style.display = 'block'
}

let playerScoresSF = []

const nextLevel = document.querySelector('#next-level-button')

nextLevel.addEventListener('click', () => {
  const livesSF = Number(document.querySelector('#lives').innerHTML)
  const scoreSF = Number(document.querySelector('#score').innerHTML)
  const playerSF = { lives: livesSF, score: scoreSF }
  playerScoresSF.push(playerSF)

  if (localStorage) {
    localStorage.setItem('scoresSF', JSON.stringify(playerScoresSF))
  }
})


// --- Rules Modal ---

const rulesModal = document.querySelector('#rules-modal')

const span3 = document.querySelector('#span-3')

const overlay = document.querySelector('#overlay')

overlay.onclick = function() {
  rulesModal.style.display = 'none'
  scoresModal.style.display = 'none'
  overlay.style.display = 'none'
}

span3.onclick = function () {
  rulesModal.style.display = 'none'
  overlay.style.display = 'none'
}

const rulesButton = document.querySelector('#rules')

rulesButton.onclick = function () {
  rulesModal.style.display = 'block'
  overlay.style.display = 'block'
}


// --- Game Over Modal ---

const gameOverModal = document.querySelector('#gameover-modal')

const span1 = document.querySelector('#span-1')

span1.onclick = function () {
  gameOverModal.style.display = 'none'
  overlay2.style.display = 'none'
}



// --- Win Modal ---

const winModal = document.querySelector('#win-modal')

const span2 = document.querySelector('#span-2')

span2.onclick = function () {
  winModal.style.display = 'none'
  overlay2.style.display = 'none'
}


// --- Scoreboard Modal ---

const scoresModal = document.querySelector('#scores-modal')

const span5 = document.querySelector('#span-5')

span5.onclick = function () {
  scoresModal.style.display = 'none'
  overlay.style.display = 'none'
}

const scoresButton = document.querySelector('#scoreboard')

scoresButton.onclick = function () {
  scoresModal.style.display = 'block'
  overlay.style.display = 'block'
}

// --- Start Button ---

const startButton = document.querySelector('#start')

function startGame() {
  interval = setInterval(() => {
    moveAllDroids(arrayAllDroids[2], arrayLeadsAndTails[2], arrayHitDroids[2])
    moveAllDroids(arrayAllDroids[1], arrayLeadsAndTails[1], arrayHitDroids[1])
    moveAllDroids(arrayAllDroids[0], arrayLeadsAndTails[0], arrayHitDroids[0])
  }, 1000)

  interval2 = setInterval(() => {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains('laser') === true) {
        removeLaser(i)
        addLaser(i - width)
        droidHit()
      }
    }
  }, 200)


  interval5 = setInterval(() => {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains('laser') === true && cells[i].classList.contains('elaser') === true) {
        removeLaser(i)
        removeELaser(i)
        
      }
    }
  }, 10)


  interval3 = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * (arrayAllDroids.flat(Infinity).length))
    addELaser(arrayAllDroids.flat(Infinity)[randomIndex])
  }, 1000)


  interval4 = setInterval(() => {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains('elaser') === true) {
        removeELaser(i)
        addELaser(i + width)
        mFalconHit()
        return
      }
    }
  }, 100)
}

startButton.onclick = function() {
  startGame()
}


// --- Quit Buttons ---

const quitButton = document.querySelector('#quit-button')

quitButton.onclick = function () {
  window.location.reload()
}


// --- Restart Buttons ---

const restartButton = document.querySelector('#restart-button')

restartButton.onclick = function () {
  document.location.reload()
  startGame()
}


const restartButton3 = document.querySelector('#restart3-button')

restartButton3.onclick = function () {
  document.location.reload()
  startGame()
}


// * === Score & Lives ===

let score = 0

let lives = 3


const scoretally = document.querySelector('#score')
const livestally = document.querySelector('#lives')


// * === Grid ===

const grid = document.querySelector('.grid')

const cells = []

const width = 9

for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
}


// * === Min & Max Rows ===

const row1Beg = (width * (1 - 1))
const row2Beg = (width * (2 - 1))
const row3Beg = (width * (3 - 1))
const row4Beg = (width * (4 - 1))
const row5Beg = (width * (5 - 1))
const row6Beg = (width * (6 - 1))
const row7Beg = (width * (7 - 1))
const row8Beg = (width * (8 - 1))
const row9Beg = (width * (9 - 1))

const row1End = ((width * (width - (width - 1))) - 1)
const row2End = ((width * (width - (width - 2))) - 1)
const row3End = ((width * (width - (width - 3))) - 1)
const row4End = ((width * (width - (width - 4))) - 1)
const row5End = ((width * (width - (width - 5))) - 1)
const row6End = ((width * (width - (width - 6))) - 1)
const row7End = ((width * (width - (width - 7))) - 1)
const row8End = ((width * (width - (width - 8))) - 1)
const row9End = ((width * (width - (width - 9))) - 1)


// * === mFalcon ===

let mFalcon = 76

cells[mFalcon].classList.add('mFalcon')

document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === 'ArrowUp' && !(mFalcon < (width * (width - 2)))) {
    cells[mFalcon].classList.remove('mFalcon')
    mFalcon -= width
    cells[mFalcon].classList.add('mFalcon')
  } else if (key === 'ArrowDown' && (mFalcon < (width ** 2) - width)) {
    cells[mFalcon].classList.remove('mFalcon')
    mFalcon += width
    cells[mFalcon].classList.add('mFalcon')
  } else if (key === 'ArrowLeft' && !(mFalcon % width === 0)) {
    cells[mFalcon].classList.remove('mFalcon')
    mFalcon -= 1
    cells[mFalcon].classList.add('mFalcon')
  } else if (key === 'ArrowRight' && !(mFalcon % width === width - 1)) {
    cells[mFalcon].classList.remove('mFalcon')
    mFalcon += 1
    cells[mFalcon].classList.add('mFalcon')
  }
})


// * === bDroids ===

const arrayAllDroids = [[0, 1, 2, 3, 4, 5, 6], [11, 12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23, 24]]

const arrayLeadsAndTails = [[0, 6], [11, 17], [18, 24]]


// * === Find/Add/Remove Lead ===

function findLead(array) {
  return Math.max.apply(Math, array)
}

function addLead(index) {
  cells[index].classList.add('lead')
}

function removeLead(index) {
  cells[index].classList.remove('lead')
}


// * === Find/Add/Remove Tail ===

function findTail(array) {
  return Math.min.apply(Math, array)
}

function addTail(index) {
  cells[index].classList.add('tail')
}

function removeTail(index) {
  cells[index].classList.remove('tail')
}


// * === Move Lead & Tail ===

function moveLAndTRight(array) {
  removeLead(array[1])
  removeTail(array[0])
  for (let i = 0; i < array.length; i++) {
    array[i] += 1
  }
  addLead(array[1])
  addTail(array[0])
}

function moveLAndTLeft(array) {
  removeLead(array[1])
  removeTail(array[0])
  for (let i = 0; i < array.length; i++) {
    array[i] -= 1
  }
  addLead(array[1])
  addTail(array[0])
}

function moveLAndTDown(array) {
  removeLead(array[1])
  removeTail(array[0])
  for (let i = 0; i < array.length; i++) {
    array[i] += width
  }
  addLead(array[1])
  addTail(array[0])
}


// * === Add/Remove bDroids ===

function addDroids(array) {
  array.forEach((droid) => {
    cells[droid].classList.add('bDroid')
  })
}


function removeDroids(array) {
  array.forEach((droid) => {
    cells[droid].classList.remove('bDroid')
  })
}

addDroids(arrayAllDroids[0])
addDroids(arrayAllDroids[1])
addDroids(arrayAllDroids[2])

addLead(arrayLeadsAndTails[0][1])
addTail(arrayLeadsAndTails[0][0])

addLead(arrayLeadsAndTails[1][1])
addTail(arrayLeadsAndTails[1][0])

addLead(arrayLeadsAndTails[2][1])
addTail(arrayLeadsAndTails[2][0])


// * === Move bDroids ===

function moveDroidsRight(array) {
  removeDroids(array)
  for (let i = 0; i < array.length; i++) {
    array[i] += 1
  }
  addDroids(array)
}

function moveDroidsLeft(array) {
  removeDroids(array)
  for (let i = 0; i < array.length; i++) {
    array[i] -= 1
  }
  addDroids(array)
}

function moveDroidsDown(array) {
  removeDroids(array)
  for (let i = 0; i < array.length; i++) {
    array[i] += width
  }
  addDroids(array)
}


// * === Find Land bDroids ===

const lastRow = []

for (let i = 0; i < width; i++) {
  lastRow[i] = (width * (width - 1)) + i
}

function findLandDroids() {
  for (let i = 0; i < lastRow.length; i++) {
    if (cells[lastRow[i]].classList.contains('bDroid')) {
      gameOver()
      clearInterval(interval)
      clearInterval(interval2)
      clearInterval(interval3)
      clearInterval(interval4)
      clearInterval(interval5)
    }
  }
}


// * === Move All ===

function moveAllDown(array, array2, array3) {
  moveDroidsDown(array)
  moveLAndTDown(array2)
  moveHitsDown(array3)
}

function moveAllRight(array, array2, array3) {
  moveDroidsRight(array)
  moveLAndTRight(array2)
  moveHitsRight(array3)
}

function moveAllLeft(array, array2, array3) {
  moveDroidsLeft(array)
  moveLAndTLeft(array2)
  moveHitsLeft(array3)
}

function moveAllDroids(array, array2, array3) {
  const lead = findLead(array2)
  const tail = findTail(array2)
  findLandDroids()
  if (lead < row1End) {
    // Row 1 (Right)
    moveAllRight(array, array2, array3)
  } else if (lead === row1End) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (tail > row2Beg && tail < row2End) {
    // Row 2 (Left)
    moveAllLeft(array, array2, array3)
  } else if (tail === row2Beg) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (lead < row3End && lead > row3Beg) {
    // Row 3 (Right)
    moveAllRight(array, array2, array3)
  } else if (lead === row3End) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (tail > row4Beg && tail < row4End) {
    // Row 4 (Left)
    moveAllLeft(array, array2, array3)
  } else if (tail === row4Beg) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (lead < row5End && lead > row5Beg) {
    // Row 5 (Right)
    moveAllRight(array, array2, array3)
  } else if (lead === row5End) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (tail > row6Beg && tail < row6End) {
    // Row 6 (Left)
    moveAllLeft(array, array2, array3)
  } else if (tail === row6Beg) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (lead < row7End && lead > row7Beg) {
    // Row 7 (Right)
    moveAllRight(array, array2, array3)
  } else if (lead === row7End) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (tail > row8Beg && tail < row8End) {
    // Row 8 (Left)
    moveAllLeft(array, array2, array3)
  } else if (tail === row8Beg) {
    // Down
    moveAllDown(array, array2, array3)
  } else if (lead < row9End && lead > row9Beg) {
    // Row 9 (Right)
    moveAllRight(array, array2, array3)
  }
}


// * === Laser ===

let laser

function addLaser(index) {
  cells[index].classList.add('laser')
}

function removeLaser(index) {
  cells[index].classList.remove('laser')
}

document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === ' ') {
    laser = mFalcon - width
    addLaser(laser)
  }
})


// * === SumDroids ===

let sum = 0

function sumDroids() {
  const array = arrayAllDroids.flat((Infinity))
  sum = array.reduce((acc, num) => {
    return acc + num
  }, 0)
}



// * === Hit bDroids ===

const arrayHitDroids = [[], [], []]

const maxScore = arrayAllDroids.flat((Infinity)).length * 100

function droidHit() {
  for (let i = 0; i < cells.length; i++) {
    sumDroids()
    if (cells[i].classList.contains('hit') === true && cells[i].classList.contains('laser') === true) {
      return
    } else if (cells[i].classList.contains('bDroid') === true && cells[i].classList.contains('laser') === true) {
      if (i >= arrayLeadsAndTails[0][0] && i <= arrayLeadsAndTails[0][1]) {
        arrayHitDroids[0].push(i)
        delete arrayAllDroids[0].splice([arrayAllDroids[0].indexOf(i)], 1)
      } else if (i >= arrayLeadsAndTails[1][0] && i <= arrayLeadsAndTails[1][1]) {
        arrayHitDroids[1].push(i)
        delete arrayAllDroids[1].splice([arrayAllDroids[1].indexOf(i)], 1)
      } else if (i >= arrayLeadsAndTails[2][0] && i <= arrayLeadsAndTails[2][1]) {
        arrayHitDroids[2].push(i)
        delete arrayAllDroids[2].splice([arrayAllDroids[2].indexOf(i)], 1)
      }
      cells[i].classList.remove('bDroid')
      cells[i].classList.add('hit')
      score += 100
      scoretally.innerHTML = score
      removeLaser(i)
      laser = mFalcon
    }
    if (sum === 0) {
      gameWon()
      clearInterval(interval)
      clearInterval(interval2)
      clearInterval(interval3)
      clearInterval(interval4)
      clearInterval(interval5)
    }
  }
}


// * === Add/Remove Hits ===

function addHits(array) {
  array.forEach((hit) => {
    cells[hit].classList.add('hit')
  })
}

function removeHits(array) {
  array.forEach((hit) => {
    cells[hit].classList.remove('hit')
  })
}


// * === Move Hits ===

function moveHitsRight(array) {
  removeHits(array)
  for (let i = 0; i < array.length; i++) {
    array[i] += 1
  }
  addHits(array)
}

function moveHitsLeft(array) {
  removeHits(array)
  for (let i = 0; i < array.length; i++) {
    array[i] -= 1
  }
  addHits(array)
}

function moveHitsDown(array) {
  removeHits(array)
  for (let i = 0; i < array.length; i++) {
    array[i] += width
  }
  addHits(array)
}


// * === Multiple ELasers ===

let interval
let interval2
let interval3
let interval4
let interval5

function addELaser(index) {
  cells[index].classList.add('elaser')
}

function removeELaser(index) {
  cells[index].classList.remove('elaser')
}

function mFalconHit() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains('mFalcon') === true && cells[i].classList.contains('elaser') === true) {
      lives -= 1
      livestally.innerHTML = lives
      score -= 250
      scoretally.innerHTML = score
      removeELaser(i)
    }
    if (lives === 0) {
      gameOver()
      clearInterval(interval)
      clearInterval(interval2)
      clearInterval(interval3)
      clearInterval(interval4)
      clearInterval(interval5)
    }
  }
}



// * === Local Storage ===

let playerScores = []
const scoreList = document.querySelector('ol')
const submit = document.querySelector('#submit-score')


if (localStorage.getItem('scores') !== null) {
  playerScores = JSON.parse(localStorage.getItem('scores'))
  orderAndDisplayScores()
}

submit.addEventListener('click', () => {
  document.querySelector('#submit-score').disabled = true
  const newName = document.querySelector('input').value
  const finalScore = Number(document.querySelector('#player-score').innerHTML)
  const player = { name: newName, score: finalScore }
  playerScores.push(player)

  if (localStorage) {
    localStorage.setItem('scores', JSON.stringify(playerScores))
  }
  orderAndDisplayScores()
})


function orderAndDisplayScores() {
  const array = playerScores
    .sort((playerA, playerB) => playerB.score - playerA.score)
    .map(player => {
      return `<li>${player.name}............            ${player.score}</li>`
    })
  scoreList.innerHTML = array.join('')
}





