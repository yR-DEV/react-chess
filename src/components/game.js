import React from 'react';

import '../index.css'
import Board from './board.js';
import InitializeChessBoard from '../helpers/initializeChessBoard.js';
import CapturedPieces from './captured-pieces.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: InitializeChessBoard(),
            whitePiecesCaptured: [],
            blackPiecesCaptured: [],
            player: 1,
            selectedSquare: -1,
            status: '',
            turn: 'white',
        }
    }

    handleClick(i) {
        // Deconstructing squares array from state 
        const squares = [...this.state.squares];
        



        // FIRST MOVE/CLICK LOGIC BLOCK
        // Checking to see if a square has been selected yet
        // this element of the state changes after a correct selection has been made by the player
        if (this.state.selectedSquare === -1) {
            // WITHOUT A SQUARE ALREADY SELECTED: if the square initially selected is null OR
            // the player of the selected piece does not match the players turn intdicated by state of board
            if(!squares[i] || squares[i].player !== this.state.player) {
                // Setting state message to indicate incorrect selection
                this.setState({status: "Wrong selection, please try again"});
                // if the selected square was not null but also not the correct player's piece
                // make sure that the background isn't changed to the color indicating a selected piece
                if (squares[i]) {
                    squares[i].style = { ...squares[i].style, backgroundColor: "" };
                }
            // ELSE the correct player piece was selected SO change the background color of the square and change the selectedpiece in state
            // to the piece selected by the player
            } else {
                squares[i].style = { ...squares[i].style, backgroundColor: "#ff0569" };
                this.setState({
                    status: "Choose your move!",
                    selectedSquare: i
                })
            }
            return;
        }

        // This turns the background color of the square from something that was selected back to its default background color
        // the code will not reach this block unless a square has already been selected and the state.selectedSquare has been changed
        squares[this.state.selectedSquare].style = { ...squares[this.state.selectedSquare].style, backgroundColor: "" };




        // SECOND MOVE/CLICK LOGIC BLOCK
        // THIS BLOCK WILL ONLY BE REACHED IF selectedSquare != -1 I.E. This is the second click when a player is moving the corresponding piece
        // If the squre clicked is null in array (i.e. there is NOT a piece in thagt square) AND 
        // the player of the piece selected it NOT EQUAL to the player's turn indicated by the board's state
        if (squares[i] && squares[i].player === this.state.player) {
            this.setState({
                status: "Incorrect selection, please try again!",
                selectedSquare: -1
            });
        // ELSE (basically) if the square is not null
        // and we will eventually move/take pieces in this conditional block    
        } else {

             // Getting the movement path array, need to check if any of them are null
             // const movePathArray = squares[this.state.selectedSquare].getMovePath(this.state.selectedSquare, i);
             // const isPathClean = (movePathArray, squares) => movePathArray.reduce((acc, curr) => !squares[curr] ?  false : true);
             // let isPathClean = movePathArray.forEach(element => {if (!squares[element]) console.log("fak");})

            // empty arrays for captured pieces
            const whitePiecesCaptured = [];
            const blackPiecesCaptured = [];
            // checking, by boolean, whether or not there is a piece in the square clicked
            const isDestSquareOccupied = Boolean(squares[i]);
            // To determine whether or not the move is possible we call on the method of the selected piece
            // the isDestSquareOccupied is only for the pawn piece who cannot take enemy pieces in a forward direction
            const isMovePossible = squares[this.state.selectedSquare].isMovePossible(this.state.selectedSquare, i, isDestSquareOccupied);


            // if the move is demeed possible by the method of the selected square and saved into the constant above, below block will execute
            if (isMovePossible) {
                // If the second selected square is NOT NULL i.e. it is occupied by an enemy piece that the player is going to capture
                // we are going to determine the player and place that captured piece into the appropiate array and move it off board
                if (squares[i] !== null) {
                    if (squares[i].player === 1 ) {
                        whitePiecesCaptured.push(squares[i]);
                    } else {
                        blackPiecesCaptured.push(squares[i]);
                    }
                }

                // Regardless of whether or not the move is capturing an enemy piece, the move IS valid and we need to change
                // the new loication of the piece on the board and change the previous square to null as it is not there anymore
                squares[i] = squares[this.state.selectedSquare];
                squares[this.state.selectedSquare] = null;

                // Placeholder for the checkmate logic to be created
                // Otherwise we are going to change the player turn number and piece color
                if (false) {
                    // CHECKMATE LOGIC TO GO HERE --PLACEHOLDER---
                } else {
                    let player = this.state.player === 1 ? 2 : 1;
                    let turn = this.state.turn === 'white' ? 'black' : 'white';
                    // according to the React documentation, the first argument taken into setState is the previous state, 
                    // and the second argument is the props. SO i am using deconstruction with the previous state here to add in the newly captured pieces
                    this.setState( prevState => ({
                        selectedSquare: -1,
                        squares,
                        whitePiecesCaptured: [...prevState.whitePiecesCaptured, ...whitePiecesCaptured],
                        blackPiecesCaptured: [...prevState.blackPiecesCaptured, ...blackPiecesCaptured],
                        player,
                        turn,
                        status: ''
                    }));
                }
            // If the move is not possible, reset seletedSquare to -1 and provide error message
            // for the attempted player move. 
            } else {
                this.setState({
                    status: "Incorrect selection, please try again!",
                    selectedSquare: -1
                }); 
            }
        }
    } 

    // Need to replace this with better logic for checking if path is clear
    // isMoveLegal(getMovePath) {
    //     let isLegal = true;
    //     for(let i = 0; i < getMovePath.length; i++) {
    //         if(this.state.squares[getMovePath[i]] !== null) {
    //             isLegal = false;
    //         }
    //     }
    //     return isLegal;
    // }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={this.state.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-status">
                    {this.state.status} <br/>
                    <div> Player: {this.state.player}</div> <br/>
                    <div> Turn of:{this.state.turn} </div><br/>
                    <div> Square Selected: {this.state.selectedSquare} </div><br/>
                    <div className="captured-pieces">
                        {<CapturedPieces
                            whitePiecesCaptured={this.state.whitePiecesCaptured}
                            blackPiecesCaptured={this.state.blackPiecesCaptured}
                        />
                        }
                    </div>
                </div>
            </div>
        )
    }
}