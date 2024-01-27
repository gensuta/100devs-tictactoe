// *VARIABLES* //
const body = document.body; // storing our body to get it quicker
const cells = document.getElementsByClassName('cell'); // storing all the divs with the class name cell


let dataCells = []; // this is where our DataCell objects will live

let currentSymbol = "X"; // starting the game with X going first

const restartBtn = document.getElementById('restartButton'); // storing the restart button

restartBtn.addEventListener('click', StartGame); // restarting the game by running the StartGame function again! It will clear all cells

const winningMessageElement = document.getElementById('winningMessage'); // storing the winning msg div
const winningMessageText = document.querySelector('[data-winning-message-text]'); // storing the winning msg 

// *FUNCTIONS* //

// this should be called only ONCE when the page loads to initialize everything
function InitGame()
{
    dataCells = []; // clearing the array just in case

    //using ... to turn cells from an HTMLCollection to an array
    [...cells].forEach(cell => {
        cell.textContent = " "; // making sure our cell is empty
        let newDataCell = new DataCell(cell); // attaching our cell to the object DataCell

        dataCells.push(newDataCell); // adding our new DataCell to our array! Gotta keep track of them.
    });
}


function StartGame()
{
    currentSymbol = 'X';
    
    dataCells.forEach(cell => {cell.ResetCell()});

    winningMessageElement.classList.remove('show');
}

function ChangePlayer()
{
    // using a ternary to keep practing it!
    // this basically says, if our current symbol is x, set it to o. Else we'll set it to X
    currentSymbol = (currentSymbol == "X") ? "O" : "X";
}

// Check for Win / Tie
function CheckForWin() {

    const player1Moves = dataCells.filter(cell => cell.symbol === 'X');
    const player2Moves = dataCells.filter(cell => cell.symbol === 'O');

    const checkPlayerWin = (moves) => {
        
    // Check for win horizontally
        for (let i = 0; i < moves.length; i+=3) {
            if (
                moves.some(cell => cell.cellElement.dataset.index === i.toString()) &&
                moves.some(cell => cell.cellElement.dataset.index === (i + 1).toString()) &&
                moves.some(cell => cell.cellElement.dataset.index === (i + 2).toString())
                ) {
                console.log(`${currentSymbol} wins  horizontally!`);
                return true;
            }
        }

        // Check for a win vertically
        for (let i = 0; i < 3; i++) {
            if (
                moves.some(cell => cell.cellElement.dataset.index === i.toString()) &&
                moves.some(cell => cell.cellElement.dataset.index === (i + 3).toString()) &&
                moves.some(cell => cell.cellElement.dataset.index === (i + 6).toString())
                )  {
                console.log(`${currentSymbol} wins  vertically!`);
                return true;
            }
        }

        // Check for a win diagonally
        if (
            moves.some(cell => cell.cellElement.dataset.index === '0') &&
            moves.some(cell => cell.cellElement.dataset.index === '4') &&
            moves.some(cell => cell.cellElement.dataset.index === '8')
        ) {
            console.log(`${currentSymbol} wins  diagonally!`);
            return true;
        }

        if (
            moves.some(cell => cell.cellElement.dataset.index === '2') &&
            moves.some(cell => cell.cellElement.dataset.index === '4') &&
            moves.some(cell => cell.cellElement.dataset.index === '6')
        ) {
            console.log(`${currentSymbol} wins  diagonally!`);
            return true;
        }else{
            return false;
        }
    };

    const player1Wins = checkPlayerWin(player1Moves);
    const player2Wins = checkPlayerWin(player2Moves);

    if(player1Wins || player2Wins){
        
        endGame(true)
        
        console.log(`${currentSymbol}'s Wins!`)
    }else if(isDraw()){
        endGame(false)
        console.log('Draw')
        // If no win is detected log players moves for debugging purposes only
        console.log(`X's moves: `, player1Moves.map(cell => cell.cellElement.dataset.index));
        console.log(`O's moves: `, player2Moves.map(cell => cell.cellElement.dataset.index));
    }else{
        // logs for debugging
        console.log(player1Moves);
        console.log(player2Moves);
    }
};

function endGame(win){
    if(win){
        winningMessageText.innerText = `${currentSymbol} Wins!`
    }else {
        winningMessageText.innerText = 'Draw!'
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return dataCells.every(cell =>{
        return cell.symbol.includes('X') || cell.symbol.includes('O')
    })
}



// *OBJECTS* //

// The DataCell class represents each box that can be filled with X or O
class DataCell{

    // This constructor is filled with events so that each datacell is being tracked properly
    // Meaning, when a new DataCell is created, it stores one of the divs into it's "cellElement", sets it's symbol to blank
    // and makes sure it's checking if the cellElement is being hovered on, clicked, or if it stopped being hovered on

    constructor(c){
        this.cellElement = c;
        this.cellElement.dataset.index = c.dataset.index; // Assigning index to the dataset
        this.isFilled = false;
        this.symbol = ""; // our symbol should be empty! along with it's text

        this.cellElement.addEventListener("mouseover", (event) => {
            if(!this.isFilled)
            {
                event.target.style.color = "grey";
                event.target.textContent = currentSymbol;
            }
         
        });

        this.cellElement.addEventListener("mouseleave", (event) => {
            if(!this.isFilled)
            { 
                event.target.style.color = "black";
                event.target.textContent = ""; // clearing the cell since we're no longer hovering over it
            }
        });

        this.cellElement.addEventListener("mousedown", () => {
            console.log(`bro!!!! we are ${this.isFilled}`);
            
            if(!this.isFilled && this.symbol == "")
            {
                this.SetSymbol(); // since we clicked on a cell, we're setting the text to our current symbol (X or O)
                CheckForWin();
                ChangePlayer(); // TODO: Find a way to make this cleaner so it's listening to the object instead of having the object call an outside function -Geneva
            }
        });
    }

    // added to ensure we don't have to create new DataCells everytime we restart the game
    // it was most likely causing the issue where the symbols would switch after winning
    ResetCell()
    {
        this.isFilled = false;
        this.cellElement.style.color = "black";
        this.symbol = "";
        this.cellElement.textContent = "";
    }
 
    SetSymbol() // setting the cell to an X or O. Making sure it can't be overwritten by setting isFilled to true
    {        
        this.isFilled = true;
        this.cellElement.style.color = "black";
        this.symbol = currentSymbol;
        this.cellElement.textContent = currentSymbol;
        console.log(`${this.symbol} vs ${currentSymbol} and we are ${this.cellElement.dataset.index}`);

    }
}

// *FUNCTIONS TO BE CALLED WHEN THE PAGE LOADS* //

InitGame();
StartGame(); // we start the game whent he page loads
