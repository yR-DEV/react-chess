import React from 'react';

import '../index.css';
import Square from './square.js';

export default class Board extends React.Component {

    renderSquare(i, squareShading) {
        return <Square
        shade={squareShading}
        style={this.props.squares[i] ? this.props.squares[i].style : null}
        piece={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        // The board is a single array containing 64 total items, 63 starting at 0 index
        const gameBoard = [];
        let i, j;
        // Chessboard is 8 squares by 8 squares so we start out with a loop for rows
        for (i = 0; i < 8; i++) {
            // Inside of looping through rows we have a loop for the 8 columns in each row
            const rowOfSquares = [];
            for (j = 0; j < 8; j++) {
                // passes in both the row and column into the isItEven function to determine the background color
                // of the square. 
                const squareShading = (isItEven(i) && isItEven(j)) || (!isItEven(i) && !isItEven(j)) ? "light-square" : "dark-square";
                // Because the board is a single array with a length of 64, we call renderSquare passing
                // the i counter (which is row counter) multiplied by 8 to calculate the row and 
                // adding 8 to target the column inside the row
                rowOfSquares.push(this.renderSquare((i * 8) + j, squareShading))
            }
        // Finally, after an entire row is created, push the row into the board array
        gameBoard.push(<div className="board-row">{rowOfSquares}</div>)
        }

        return (
            <div>
                {gameBoard}
            </div>
        );
    }
};

// Checking whether or not the RowNumber/ColumnNumber is even
function isItEven(number){
    return number % 2 === 0;
};