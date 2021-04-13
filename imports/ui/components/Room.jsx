import * as Constants from "../util/Constants.jsx";

class Room {
    constructor(id) {
        this.id = id;
        this.avgTemp = 20;
        this.color = 'darkblue';
        this.isActivated = false;
    }
}

export default Room