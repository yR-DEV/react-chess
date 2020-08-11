export default class Piece {
    constructor(player, iconUrl) {
        this.player = player;
        this.style = {backgroundImage: "url('"+iconUrl+"')"};
    }
}

// Although react officially discourgages using class inheritance
// It is probably best to use class inheritance when making chess...