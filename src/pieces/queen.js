import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(player) {
        // Super inheriting contructor from Piece whhich includes which player is it, and the icon for the particular chess piece
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" 
                        : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"));
    }

    isMovePossible(startSquare, endSquare) {
        // By returning modulus we can basically turn each row into a 0-7 index 
        let mod = startSquare % 8;
        let difference = 8 - mod;

        return (Math.abs(startSquare - endSquare) % 7 === 0 ||
                Math.abs(startSquare - endSquare) % 8 === 0 ||
                Math.abs(startSquare - endSquare) % 9 === 0 || 
                (endSquare >= (startSquare - mod) && 
                    (endSquare > (startSquare + difference))));
    }

    // Gets all the indexes of the squares of the move as an array.
    // We will use this array later to check if there are any other pieces 
    getMovePath(startSquare, endSquare) {
        let movementPath = [];
        let pathStart, pathEnd, incrementBy;

        // Setting the numbers low to high for array organization ascending
        if (startSquare > endSquare) {
            pathStart = endSquare;
            pathEnd = startSquare
        } else {
            pathStart = startSquare;
            pathEnd = endSquare;
        }

        // %7 means movement diagonally in direction of / 
        if (Math.abs(startSquare - endSquare) % 7 === 0) {
            incrementBy = 7;
            pathStart += 7;
        // % 8 indicates vertical movement    
        } else if (Math.abs(startSquare - endSquare) % 8 === 0) {
            incrementBy = 8;
            pathStart += 8;
        // % 9 means movement diagonally in the direction of \    
        } else if (Math.abs(startSquare - endSquare) % 9 === 0) {
            incrementBy = 9;
            pathStart += 9;
        // Otherwise the movement is horizontal and increments by 1    
        } else {
            incrementBy = 1;
            pathStart += 1;
        }
        
        // Loop that creates the array according to:
            // starting and ending squares AS WELL AS
            // the direction indicated by the incrementBy variable
        for(let i = pathStart; i < pathEnd; i += incrementBy){
            movementPath.push(i);
        }
          return movementPath;
    }
}