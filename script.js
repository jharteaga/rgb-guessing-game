let numberOfSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDipslay = document.getElementById('display');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetBtn = document.querySelector('#reset');
let modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    //mode buttons event listeners
    setUpModeButtons();

    //Set up squares
    setUpSquares();

    reset();
}

function setUpModeButtons(){
    for (let i=0; i< modeButtons.length; i++){
        modeButtons[i].addEventListener('click', function(){
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            (this.textContent === 'Easy') ? numberOfSquares = 3 : numberOfSquares = 6;
            reset();
        });
    }
}

function setUpSquares(){
    squares.forEach((square, i) => {
        //Add listener
        squares[i].addEventListener('click', () => {
            let clickedColor = squares[i].style.backgroundColor;
            if (pickedColor === clickedColor) {
                messageDisplay.textContent = 'Correct!';
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetBtn.textContent = "Play Again?";
            } else {
                squares[i].style.backgroundColor = "#232323";
                messageDisplay.textContent = 'Try Again!';
            }
        });
    });
}

function reset(){
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    colorDipslay.textContent = pickedColor;
    squares.forEach((square,i) => {
        if (colors[i]) {
            square.style.display = 'block';
            square.style.backgroundColor = colors[i];
        } else {
            square.style.display = 'none';
        }
    });
    h1.style.backgroundColor = "steelblue";
    resetBtn.textContent = "New Colors";
    messageDisplay.textContent = "";
}

resetBtn.addEventListener('click', function(){
    reset();
});

function changeColors(color){
    //loop through all squares and change color that match the picked color
    squares.forEach(square => {
        square.style.backgroundColor = color;
    });
}

function pickColor(){
    //Select a random color from the array colors
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    let arr = [];
    for (let i=0; i<num; i++){
        //get random color and push it into the arr
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    //Generates colors Red, Green and Blue
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}