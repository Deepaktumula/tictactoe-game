const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Creating a funciton to initializing the game
function initGame()
{
    // intial values
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // Need to Update on UI also
    boxes.forEach( (box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Missing Part initialize boxes with css properties again
        box.classList = `box box${index+1}`;
    } )
    newGameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

initGame();

function swapTurn()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }
    // Update the UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver()
{
    let winner = "";

    winningPositions.forEach((position) => {
        // All 3 boxes should not be non-empty and should be of exactly same value
        if( ( gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )&& 
        (gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]] ) )
        {
            // Check if winner is X
            if(gameGrid[position[0]] === "X" )
                winner = "X";
            else
                winner = "O";

            // Diable pointerEvents because we already got winner
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Now we know the winner so we need to set green Color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // It means we have a winner
    if(winner !== "")
    {
        gameInfo.innerText = `winner player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Check whether it is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        {
            fillCount++;
        }
    });
    // board is filled and the game is TIE
    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index)
{
    // if Grid is empty then execute this code
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swap the turn of the player
        swapTurn();
        // check if anybody won
        checkGameOver();
    }
}

// Applying eventListener on every box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener('click', initGame);
