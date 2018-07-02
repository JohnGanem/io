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
        this.degree = 0;
        this.size = config.defaultPlayerSize;
        this.image = config.defaultPlayerImage;
        this.radius = config.defaultPlayerSize / 2;
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

    getDegree() {
        return this.degree;
    }

    setDegree(newDegree) {
        this.degree = newDegree;
    }

    getSize() {
        return this.size;
    }

    setSize(newSize) {
        this.size = newSize;
        this.radius = newSize / 2;
    }

    getImage() {
        return this.image;
    }

    setImage(newImage) {
        this.image = newImage;
    }

    getRadius() {
        return this.radius;
    }

    setRadius(newRadius) {
        this.radius = newRadius;
        this.size = newRadius * 2;
    }

    move() {
        // Normalement on prend la racine de dist mais on préfère mettre au carré la distance minimum
        // Pour éviter d'avoir à calculer une racine carrée
        // Cela marche car les distances sont forcéments positives
        var dist = (this.target.y * this.target.y) + (this.target.x * this.target.x);
        var minimumDistPow = (config.minimumDistTouchSlow * config.minimumDistTouchSlow);
        this.degree = Math.atan2(this.target.y, this.target.x);
        var deltaX = (this.speed / config.FPS) * Math.cos(this.degree);
        var deltaY = (this.speed / config.FPS) * Math.sin(this.degree);
        // Quand l'utilisateur appuie proche du joueur, il ralentit
        if (dist < minimumDistPow) {
            deltaY *= dist / minimumDistPow;
            deltaX *= dist / minimumDistPow;
        }
        if (!isNaN(deltaY)) {
            this.position.y += Math.round(deltaY * 1e5) / 1e5; // Pour éviter les millièmes de millièmes de virgule
        }
        if (!isNaN(deltaX)) {
            this.position.x += Math.round(deltaX * 1e5) / 1e5;
        }
    }

    allToJSON() {
        return JSON.parse('{' +
                '"id":"' + this.id + '",' +
                '"socket":"' + this.socket + '",' +
                '"hue":"' + this.hue + '",' +
                '"lastConnexion":' + this.lastConnexion + ',' +
                '"name":"' + this.name + '",' +
                '"position":{"x":' + this.position.x + ',"y":' + this.position.y + '},' +
                '"target":{"x":' + this.target.x + ',"y":' + this.target.y + '},' +
                '"speed":' + this.speed + ',' +
                '"degree":' + this.degree + ',' +
                '"size":' + this.size + ',' +
                '"image":"' + this.image + '",' +
                '"radius":' + this.radius +
                '}');
    }

    drawInformationsToJson() {

    }

}

module.exports = Player;