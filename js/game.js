'use strict'

const WALL = '#'
const FOOD = '.'
const SUPERFOOD = 'o'
const EMPTY = ' '
const DEAD = 'D'
const CHERRY = '%'
const SIZE = 10


var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var foodCounter = -2
var mySetTimeoutId
var mySetIntervalId


function init() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    mySetIntervalId = setInterval(function () {createCherry(gBoard)}, 1000 * 15)

    printMat(gBoard, '.board-container')
    gGame.isOn = true
    var elGameOverModal = document.querySelector('.gameover-modal, .game-over')
    var elWinnerModal = document.querySelector('.winner-modal, .winner')
    elGameOverModal.classList.add('hidden')
    elWinnerModal.classList.add('hidden')
}

function buildBoard() {
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            foodCounter++

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                foodCounter--
            }

            if (i === 1 && j === 1 ||
                i === SIZE - 2 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = SUPERFOOD
                foodCounter--
            }
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    foodCounter = -2
    var elModal = document.querySelector('.gameover-modal, .game-over')
    elModal.classList.remove('hidden')
}

function victorious() {
    console.log('Winner')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    foodCounter = -2
    var elModal = document.querySelector('.winner-modal, .winner')
    elModal.classList.remove('hidden')
}

function addRandomCherry() {
    const cherrys = []

    for (var i = 1; i < SIZE - 1; i++) {
        for (var j = 1; j < SIZE - 1; j++) {
            var currCell = gBoard[i][j]
            if (currCell === EMPTY) {
                cherrys.push({ i, j })
            }
        }
    }

    var randomCellPos = getRandomInt(0, cherrys.length)
    //var randomCellPos = { i, j }
    // if (gBoard[i][j] === '') {
    //Model
    gBoard[randomCellPos.i][randomCellPos.j] = CHERRY
    //DOM
    renderCell(randomCellPos, CHERRY)
    console.log(randomCellPos);

    //     console.log('cherry cherry boom boom')
    // } else {
    //     console.log('not empty');
    // }
}

function createCherry(board) {
    var cherrys = []

    for (var i = 1; i < SIZE - 1; i++) {
        for (var j = 1; j < SIZE - 1; j++) {
            var currCell = gBoard[i][j]
            if (currCell === EMPTY) {
                cherrys.push({i, j})
            }
        }
    }

    var randomCherry = getRandomInt(0, cherrys.length)

    const cherry = {
        location: {
            i: cherrys[randomCherry].i,
            j: cherrys[randomCherry].j
        },
        currCellContent: EMPTY,
    }
    board[cherry.location.i][cherry.location.j] = CHERRY
}


