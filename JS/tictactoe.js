// This variable keeps track of whose turn it is
let activePlayer = "X";
// This array stores an array of moves. This is used to determine win conditions
let selectedSquares = [];

// This function is used for placing a x or o in a square
function placeXOrO(squareNumber) {
    // This condition ensures a square hasn't been selected already
    // The .some() method is used to check each element of the selectSquare array to see if it contains square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);
        // This condition checks who turn it is
        if (activePlayer === "X") {
            // If activePlayer is equal to "X", the x.png is placed in HTML
            select.style.backgroundImage = "url('Images/x.png')";
        }
        else {
            select.style.backgroundImage = "url('Images/o.png')";
        }
        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        // This calls a function to check for any win conditions
        checkWinConditions();
        // This condition is for changing the active player
        if (activePlayer === "X") {
            activePlayer = "O";
        }
        else {
            activePlayer = "X";
        }

        // This function plays a placement sound
        audio("./Media/place.mp3");
        // This condition checks to see if it is the computer's turn
        if (activePlayer === "O") {
            // This function disables clicking for the computer's turn
            disableClick();
            // This function waits one second before the computer places an image and enables click
            setTimeout(function () { computersTurn(); }, 1000);
        }
        // Returning true is needed for out computersTurn() function to work
        return true;
    }
    // This function results in a random sqaure being selected by the computer
    function computersTurn() {
        // This boolean is needed for the while loop
        let success = false;
        // This variable stores a random number from 0-8
        let pickASquare;
        // This condition allow the while loop to keep trying if  a square has been selected already
        while (!success) {
            pickASquare = String(Math.floor(Math.random() * 9));
            // The the random nuber evaluated returns true, the sqaure hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                // This changes the boolean and ends the loop
                success = true;
            }
        }
    }
}

// This function parses the selectedSquares array to search foe win conditions
// drawLine() function is called to draw a line on the screen if the condition is met
function checkWinConditions() {
    // X 0, 1, 2 condition
    if (arrayIncludes("0X", "1X", "2X")) { drawWinLine(50, 100, 558, 100) }
    // X 3, 4, 5 condition
    else if (arrayIncludes("3X", "4X", "5X")) { drawWinLine(50, 304, 558, 304) }
    // X 6, 7, 8 condition
    else if (arrayIncludes("6X", "7X", "8X")) { drawWinLine(50, 508, 558, 508) }
    // X 0, 3, 6 condition
    else if (arrayIncludes("0X", "3X", "6X")) { drawWinLine(100, 50, 100, 558) }
    // X 1, 4, 7 condition
    else if (arrayIncludes("1X", "4X", "7X")) { drawWinLine(304, 50, 304, 558) }
    // X 2, 5, 8 condition
    else if (arrayIncludes("2X", "5X", "8X")) { drawWinLine(508, 50, 508, 558) }
    // X 6, 4, 2 condition
    else if (arrayIncludes("6X", "4X", "2X")) { drawWinLine(100, 508, 510, 90) }
    // X 0, 4, 8 condition
    else if (arrayIncludes("0X", "4X", "8X")) { drawWinLine(100, 100, 520, 520) }
    // O 0, 1, 2 condition
    if (arrayIncludes("0O", "1O", "2O")) { drawWinLine(50, 100, 558, 100) }
    // O 3, 4, 5 condition
    else if (arrayIncludes("3O", "4O", "5O")) { drawWinLine(50, 304, 558, 304) }
    // O 6, 7, 8 condition
    else if (arrayIncludes("6O", "7O", "8O")) { drawWinLine(50, 508, 558, 508) }
    // O 0, 3, 6 condition
    else if (arrayIncludes("0O", "3O", "6O")) { drawWinLine(100, 50, 100, 558) }
    // O 1, 4, 7 condition
    else if (arrayIncludes("1O", "4O", "7O")) { drawWinLine(304, 50, 304, 558) }
    // O 2, 5, 8 condition
    else if (arrayIncludes("2O", "5O", "8O")) { drawWinLine(508, 50, 508, 558) }
    // O 6, 4, 2 condition
    else if (arrayIncludes("6O", "4O", "2O")) { drawWinLine(100, 508, 510, 90) }
    // O 0, 4, 8 condition
    else if (arrayIncludes("0O", "4O", "8O")) { drawWinLine(100, 100, 520, 520) }
    // This condition checks for a tie. If none of the above conditions are met and 9 squares are selected the code executes
    else if (selectedSquares.length >= 9) {
        audio("./Media/tie.mp3");
        // This function sets a .3 second timer before the resetGame is called
        setTimeout(function () { resetGame(); }, 500);
    }

    // This function checks if an array includes three strings. It is used to check for each win condition
    function arrayIncludes(squareA, squareB, sqaureC) {
        // These three variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(sqaureC);
        // if the three variables passed are all included in the array then true is returned and our else if condition executes the drawLine() function
        if (a === true && b === true && c === true) { return true; }
    }
}

// This function makes the body element temporarily unclickable
function disableClick() {
    body.style.pointerEvents = "none";
    // This makes the body clickable again after one second
    setTimeout(function () { body.style.pointerEvents = "auto"; }, 1000);
}

// This function takes a string parameter of the path set earlier for placement sound
function audio(audioURL) {
    // Creates a new audio object and passes the path as a parameter
    let audio = new Audio(audioURL);
    audio.play();
}

// This function utilizes the HTML canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // This line accesses the HTML canvas element
    const canvas = document.getElementById("win-lines");
    // This line gives access to methods and properties to use on the canvas
    const c = canvas.getContext("2d");
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        // These variables store temporary x and y axis data updates in the animation loop
        x = x1,
        y = y1;

        // This function interacts with the canvas
        function animateLineDrawing() {
            // Creates a loop
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            // Clears content from the last loop iteration
            c.clearRect(0, 0, 608, 608);
            // This method starts a new path
            c.beginPath();
            // This method moves us to a new starting point in the line
            c.moveTo(x1, y1);
            // This method indicates the end point in the line
            c.lineTo(x, y);
            // Sets the width of the line
            c.lineWidth = 10;
            // Sets the color of the line
            c.strokeStyle = "rgba(70, 255, 33, .8)";
            c.stroke();
            // Checks if the endpoints have been reached
            if (x1 <= x2 && y1 <= y2) {
                // Adds ten to the previous x and y endpoints
                if (x < x2) { x += 10; }
                if (y < y2) { y += 10; }
                // This is necessary for the 6, 4, 2 win conditions
                if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
            }
            if (x1 <= x2 && y1 >= y2) {
                if (x < x2) { x += 10; }
                if (y > y2) { y -= 10; }
                if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
            }
        }

        // Clears the canvas after the win line is drawn
        function clear() {
            // Starts the animation loop
            const animationLoop = requestAnimationFrame(clear);
            // Clears the canvas
            c.clearRect(0, 0, 608, 608);
            // Stops the animation loop
            cancelAnimationFrame(animationLoop);
        }
        // Disables clicking while the win sound is playing
        disableClick();
        // Plays the win sound
        audio("./Media/winGame.mp3");
        // Calls our main animation loop
        animateLineDrawing();
        // Waits one second then clears the canvas, resets game, and allows clicking again
        setTimeout(function () { clear(); resetGame(); }, 1000);
}

// Resets the game in the event of a tie or a win
function resetGame() {
    // The loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        // Gets the HTML element i
        let square = document.getElementById(String(i));
        // Removes the background images
        square.style.backgroundImage = "";
    }
    // Resets the array
    selectedSquares = [];
}