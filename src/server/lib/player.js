/* jslint node: true */

'use strict';
var config = require('../../../config.json');
class Player {
    constructor(id, socketId) {
        this.id = id;
        this.socket = socketId;
        this.hue = Math.round(Math.random() * 360);
        this.lastConnexion = new Date().getTime();
        this.name = 'unnamed';
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

    getSocket() {
        return this.socket;
    }

    getId() {
        return this.id;
    }

    getSecondsSinceConnexion() {
        return (new Date().getTime() - this.lastConnexion) / 1000;
    }

    updateConnexion() {
        this.lastConnexion = new Date().getTime();
    }

    getPosition() {
        return this.position;
    }

    setPosition(newPosition) {
        this.position = newPosition;
    }

    getTarget() {
        return this.target;
    }

    setTarget(newTarget) {
        this.target = newTarget;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        var regex = /^\w*$/;
        if (regex.exec(newName) !== null) {
            this.name = newName;
            return true;
        } else {
            return false;
        }
    }

    getSpeed() {
        return this.speed;
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }

    move() {
        // Normalement on prend la racine de dist mais on préfère mettre au carré la distance minimum
        // Pour éviter d'avoir à calculer une racine carrée
        // Cela marche car les distances sont forcéments positives
        var dist = (this.target.y * this.target.y) + (this.target.x * this.target.x);
        var minimumDistPow = (config.minimumDistTouchSlow * config.minimumDistTouchSlow);
        var deg = Math.atan2(this.target.y, this.target.x);

        var deltaX = (this.speed / config.FPS) * Math.cos(deg);
        var deltaY = (this.speed / config.FPS) * Math.sin(deg);

        // Quand l'utilisateur appuie proche du joueur, il ralentit
        if (dist < minimumDistPow) {
            deltaY *= dist / minimumDistPow;
            deltaX *= dist / minimumDistPow;
        }

        if (!isNaN(deltaY)) {
            this.position.y += Math.round(deltaY * 1e5) / 1e5;
        }
        if (!isNaN(deltaX)) {
            this.position.x += Math.round(deltaX * 1e5) / 1e5;
        }
    }

    draw() {

    }
}

module.exports = Player;