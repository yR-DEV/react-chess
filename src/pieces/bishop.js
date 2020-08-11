import Piece from './piece.js';

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" 
                        : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
    }

    // Bishop can only move diagonally in the 2 different directions both are calculated
    // by an absolute difference of 7 or 9
    isMovePossible(startSquare, endSquare) {
        return (Math.abs(startSquare - endSquare) % 9 === 0 ||
                Math.abs(startSquare - endSquare) % 7 === 0);
    }

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

        if (Math.abs(pathStart - pathEnd) % 7 === 0) {
            pathStart += 7;
            incrementBy = 7;
        } else {
            pathStart += 9;
            incrementBy = 9;
        }

        // Creating array of squares moved over according to their incremented direction
        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            movementPath.push(i);
        }

        return movementPath;
    }
}