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
        const squares = [...this.state.squares];

        if (this.state.selectedSquare === -1) {
            if(!squares[i] || squares[i].player !== this.state.player) {
                this.setState({status: "WRONGK"});
                if (squares[i]) {
                    squares[i].style = { ...squares[i].style, backgroundColor: "" };
                }
            } else {
                squares[i].style = { ...squares[i].style, backgroundColor: "#ff0569" };
                this.setState({
                    status: "ChooZ MOVE",
                    selectedSquare: i
                });
            }  
            return;
        }

        squares[this.state.selectedSquare].style = { ...squares[this.state.selectedSquare].style, backgroundColor: "" };

        if (squares[i] && squares[i].player === this.state.player) {
            this.setState({
                status: "WRONGK",
                selectedSquare: -1
            });
        } else {
            const whitePiecesCaptured = [];
            const blackPiecesCaptured = [];
            const isDestSquareOccupied = Boolean(squares[i]);
            const isMovePossible = squares[this.state.selectedSquare].isMovePossible(this.state.selectedSquare, i, isDestSquareOccupied);
            
            // Moves captured pieces off the board and into an array for the opposite player
            if (isMovePossible) {
                // console.log("Move possible.");
                if (squares[i] !== null) {
                    // console.log("Square not null");
                    if (squares[i].player === 1) {
                        whitePiecesCaptured.push(squares[i]);
                    } else {
                        blackPiecesCaptured.push(squares[i]);
                    }
                }

                squares[i] = squares[this.state.selectedSquare];
                squares[this.state.selectedSquare] = null;

                if (false) {
                    // logic for Check/Checkmate goes here
                } else {
                    let player = this.state.player === 1 ? 2 : 1;
                    let turn = this.state.turn === 'white' ? 'black' : 'white';

                    this.setState(oldState => ({
                        selectedSquare: -1,
                        squares,
                        whitePiecesCaptured: [...oldState.whitePiecesCaptured, ...whitePiecesCaptured],
                        blackPiecesCaptured: [...oldState.blackPiecesCaptured, ...blackPiecesCaptured],
                        player,
                        status: '',
                        turn
                    }));
                }
            } else {
                this.setState({
                    status: "WRONGK",
                    selectedSquare: -1
                });
            }
        }
    } 

    // Need to replace this with better logic for checking if path is clear
    isMoveLegal(getMovePath) {
        let isLegal = true;
        for(let i = 0; i < getMovePath.length; i++) {
            if(this.state.squares[getMovePath[i]] !== null) {
                isLegal = false;
            }
        }
        return isLegal;
    }

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
                    {this.state.player} <br/>
                    {this.state.turn} <br/>
                    {this.state.selectedSquare} <br/>
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