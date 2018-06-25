/* jslint node: true */

'use strict';
var config = require('../../../config.json');
class Player {
    constructor(socketId) {
        this.id = socketId;
        this.hue = Math.round(Math.random() * 360);
        this.lastConnexion = new Date().getTime();
        this.position = {
            x: 0,
            y: 0
        };
        this.target = {
            x: 0,
            y: 0
        };
        this.speed = config.defaultPlayerSpeed;
    }

    updateConnexion() {
        this.lastConnexion = new Date().getTime();
    }

    getId() {
        return this.id;
    }

    reposition(newPosition) {
        this.position = newPosition;
    }

    getPosition() {
        return this.position;
    }

    movePlayer() {

    }
}

module.exports = Player;