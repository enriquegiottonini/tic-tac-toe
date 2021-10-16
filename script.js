
const board = (() => {

    let boardLoc = []

    const playerOne = {
        mark: "X",
        turn: true
    };

    const playerTwo = {
        mark: "O",
        turn: false
    };

    const boardGame = document.querySelector(".board");
    const displayWinner = document.querySelector("h2");
    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => {
        resetBoard();
        boardGame.classList.remove("disabledbutton");
        displayWinner.innerHTML = "";
    })

    const addPieces = () => {
        
        for(let i=0; i<9; i++) {
            // Create each piece display on the board
            const piezePos = document.createElement("button");
            piezePos.type = "button";
            piezePos.className = "piece";
            boardGame.appendChild(piezePos)
            boardLoc.push(piezePos);

            // Each piece listen, get marked and change players' turns
            piezePos.addEventListener("click", () => {
                let marked = piezePos.innerHTML;
                if (playerOne.turn && marked == "") {
                    piezePos.innerHTML = playerOne.mark;
                    playerOne.turn = false;
                    playerTwo.turn = true;
                    isGameFinished();
                }
                else if (playerTwo.turn && marked == "") {
                    piezePos.innerHTML = playerTwo.mark;
                    playerTwo.turn = false;
                    playerOne.turn = true;
                    isGameFinished();
                }
            });

        };
    }

    const displayBoard = () => {
        console.log(boardLoc);
    }

    const resetBoard = () => {
        for(let i=0; i<9; i++) {
            boardLoc[i].innerHTML = "";
        } 
        playerOne.turn = true;
        playerTwo.turn = false;
    }


    const checkGameWin = () => {

        // Check rows
        for(let k=0; k<9; k += 3){
            if (boardLoc[k].innerHTML != "" && boardLoc[k].innerHTML == boardLoc[k+1].innerHTML && boardLoc[k+1].innerHTML  == boardLoc[k+2].innerHTML)
                return true;
        }

        // Check columns
        for(let i=0; i<3; i++) {
            if (boardLoc[i].innerHTML != "" && boardLoc[i].innerHTML == boardLoc[i+3].innerHTML && boardLoc[i+3].innerHTML  == boardLoc[i+6].innerHTML)
                return true;
        }

        // Check diagonals
        if ((boardLoc[0].innerHTML != "" && boardLoc[0].innerHTML == boardLoc[4].innerHTML && boardLoc[4].innerHTML  == boardLoc[8].innerHTML)
            || ((boardLoc[2].innerHTML != "" && boardLoc[2].innerHTML == boardLoc[4].innerHTML && boardLoc[4].innerHTML  == boardLoc[6].innerHTML)))
                return true;

        // Check if the board is complete
        for(let i=0; i<9; i++) {
            if (boardLoc[i].innerHTML == "")
                return false;
        }
        return "tie";

    }

    const isGameFinished = () => {
        
        if(checkGameWin() == "tie") {
           displayWinner.innerHTML = "TIE!";
           boardGame.classList.add("disabledbutton");
           }
        else if (checkGameWin()) {

            if(playerTwo.turn)
                displayWinner.innerHTML = "Player One Wins";
            else
                displayWinner.innerHTML = "Player Two Wins";

            boardGame.classList.add("disabledbutton");
        }
    }

    addPieces();

    return {displayBoard, resetBoard};
})();
