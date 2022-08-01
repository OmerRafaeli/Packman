'use strict'

const PACMAN = '😷';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        console.log(foodCounter);
        foodCounter--
        if (foodCounter < 0) {
            victorious()
        }
    } else if (nextCell === CHERRY) {
        updateScore(10)
        console.log(foodCounter);
    } else if (nextCell === GHOST) {

        if (!isFood) {
            gameOver()
            renderCell(gPacman.location, DEAD)
            clearInterval(mySetIntervalId)
            return
        }
    } else if (nextCell === SUPERFOOD) {
        if (!isFood) {
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = '#3331d1'
                isFood = true
            }
        }else{
            return
        }

        mySetTimeoutId = setTimeout(function () {
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = getRandomColor()
            }
            isFood = false
        }, 5000)
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}