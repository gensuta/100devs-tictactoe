// *VARIABLES* //

const body = document.body; // storing our body to get it quicker
const cells = document.getElementsByClassName('cell'); // storing all the divs with the class name cell

let dataCells = []; // this is where our DataCell objects will live

let currentSymbol = "X"; // starting the game with X going first

const restartBtn = document.getElementById('restartButton'); // storing the restart button

restartBtn.addEventListener('click', function(){
    StartGame(); // restarting the game by running the StartGame function again! It will clear all cells
})


const winningMessage = document.getElementById('winningMessage'); // storing the winning msg div

// *FUNCTIONS* //

function StartGame()
{
    dataCells = []; // clearing the array just in case

    //using ... to turn cells from an HTMLCollection to an array
    [...cells].forEach(cell => {
        cell.textContent = " "; // making sure our cell is empty
        let newDataCell = new DataCell(cell); // attaching our cell to the object DataCell

        dataCells.push(newDataCell); // adding our new DataCell to our array! Gotta keep track of them.
    });
}

function ChangePlayer()
{
    // using a ternary to keep practing it!
    // this basically says, if our current symbol is x, set it to o. Else we'll set it to X
    currentSymbol = (currentSymbol == "X") ? "O" : "X";
}


// *OBJECTS* //

// The DataCell class represents each box that can be filled with X or O
class DataCell{

    isFilled = false;

    // This constructor is filled with events so that each datacell is being tracked properly
    // Meaning, when a new DataCell is created, it stores one of the divs into it's "cellElement", sets it's symbol to blank
    // and makes sure it's checking if the cellElement is being hovered on, clicked, or if it stopped being hovered on
    constructor(c){
        this.cellElement = c;
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

        this.cellElement.addEventListener("mousedown", (event) => {
            if(!this.isFilled)
            {
                this.SetSymbol(); // since we clicked on a cell, we're setting the text to our current symbol (X or O)
                ChangePlayer(); // TODO: Find a way to make this cleaner so it's listening to the object instead of having the object call an outside function -Geneva
            }
        });
    }

    SetSymbol(symbol) // setting the cell to an X or O. Making sure it can't be overwritten by setting isFilled to true
    {
        this.cellElement.style.color = "black";
        this.symbol = symbol;
        this.cellElement.textContent = currentSymbol;
        this.isFilled = true;
    }
}


// *FUNCTIONS TO BE CALLED WHEN THE PAGE LOADS* //

StartGame(); // we start the game whent he page loads
