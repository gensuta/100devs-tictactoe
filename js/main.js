const body = document.body;
const cells = document.getElementsByClassName('cell');

let dataCells = [];

let currentSymbol = "X";

function StartGame()
{
    //using ... to turn cells from an HTMLCollection to an array
    [...cells].forEach(cell => {
        let newDataCell = new DataCell(cell);

        dataCells.push(newDataCell);
    });
}


// The DataCell class represents each box that can be filled with X or O
class DataCell{

    isFilled = false;

    constructor(c){
        this.cellElement = c;
        this.symbol = ""; // our symbol should be empty! along with it's text

        this.cellElement.addEventListener("mouseover", (event) => {
            if(!this.isFilled)
            {
                event.target.style.color = "red";
                event.target.textContent = currentSymbol;
            }
         
        });

        this.cellElement.addEventListener("mouseleave", (event) => {
            if(!this.isFilled)
            { 
                event.target.style.color = "black";
                event.target.textContent = "";
            }
        });

        this.cellElement.addEventListener("mousedown", (event) => {
            if(!this.isFilled)
            {
                this.SetSymbol();
            }
        });
    }

    SetSymbol(symbol) {
        this.cellElement.style.color = "black";
        this.symbol = symbol;
        this.cellElement.textContent = currentSymbol;
        this.isFilled = true;

    }
}

StartGame();


// [ ] Show who's turn it is
// [ ] On hover show a faint X or O before clicking anything
// [ ] Start / Restart game button
// [ ] Make sure turns are changing
// [ ] Make sure players can click and place an X or O
// [ ] 