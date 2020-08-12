# REACTJS CHESS
- Simple chess game created in ReactJS  

[<img src="https://cdn.discordapp.com/attachments/169789071449653250/742897800492220507/unknown.png">](https://cdn.discordapp.com/attachments/169789071449653250/742897800492220507/unknown.png)

## Development

### npm start
- Will start development server at ```http://localhost:3000```
- Page dynamically updated on file saves
- Lint errors printed to console

### npm run build
- Builds app for production and creates ```build``` folder.
- Will minify everything

# Game Board and Logic
## Checking Moves
### Is the move Possible?
- Our game board is single array with a length of 64 and this is useful when we calculate whether or not a move is possible.
- below is what our board looks like

- |0 |1 |2 |3 |4 |5 |6 |7 |
- |8 |9 |10|11|12|13|14|15|
- |16|17|18|19|20|21|22|23|
- |24|25|26|27|28|29|30|31|
- |32|33|34|35|36|37|38|39|
- etc. etc.
- \-----------------------------
- Logic in held in each piece file contains a method called isMoveLegal() whereas simple math determines if the movement from the starting square to the square chosen by the user is allowed within the movement parameters of each piece. 
- For example: the Bishop piece can only move diagonally. If the Bishop was in square index 2, moving one square would put them in either 9 or 11.
- The difference in numbered squares if it moves diagonall to the left is Math.abs 7, if it were to move diagonally to the right it would be Math.abs 9
- So we can check if the move is legal by checking if the potential move % 7 === 0 || % 9 === 0. If it is and the space is not occupied we can move the bishop to that position. 

### Is the move legal/Is the space occupied?
- the isMoveLegal method will check whether or not the movement direction is legal dependent on which player is moving the piece like the pawn movement of player 1 versus the pawn movement of player 2.
