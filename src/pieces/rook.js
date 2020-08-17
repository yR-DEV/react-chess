import Piece from './piece.js';

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" 
                        : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"));
    }

    isMovePossible(startSquare, endSquare) {
        let modulus = startSquare % 8;
        let difference = 8 - modulus;

        // % 8 meaning vertical movement for rook
        // logic after || indicating a move that exists within the same line. 
        return (Math.abs(startSquare - endSquare) % 8 === 0 ||  
        (endSquare >= (startSquare - modulus) && (endSquare > (startSquare + difference))));
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

        if (Math.abs(pathStart - pathEnd) % 8 === 0) {
            pathStart += 8;
            incrementBy = 8;
        } else {
            pathStart += 1;
            incrementBy = 1;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            movementPath.push(i);
        }

        return movementPath;
    }
}