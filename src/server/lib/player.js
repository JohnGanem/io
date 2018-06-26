/* jslint node: true */

'use strict';
var rootPath = '../..';
var config = require(rootPath + '/../config.json');
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

    static draw(player, graph, xOffset = 0, yOffset = 0) {
        function valueInRange(min, max, value) {
            return Math.min(max, Math.max(min, value));
        }
        var x = 0;
        var y = 0;
        var points = 30 + ~~(player.size / 5); // On a minimum 30 points pour délimiter un cercle + size / 5
        var increase = Math.PI * 2 / points; // On fait le tour du cercle
        var xstore = [];
        var ystore = [];
        var spin = Math.PI;
        var circle = {
            x: xOffset,
            y: yOffset
        };
        graph.strokeStyle = 'hsl(' + player.hue + ', 100%, 45%)';
        graph.fillStyle = 'hsl(' + player.hue + ', 100%, 50%)';
        graph.lineWidth = config.playerBorder;

        for (var i = 0; i < points; i++) {
            x = player.radius * Math.cos(spin) + circle.x;
            y = player.radius * Math.sin(spin) + circle.y;
            x = valueInRange(-player.position.x - player.position.x + global.screenWidth / 2 + (player.radius / 3),
                    global.gameWidth - player.position.x + global.gameWidth - player.position.x + global.screenWidth / 2 - (player.radius / 3), x);
            y = valueInRange(-player.position.y - player.position.y + global.screenHeight / 2 + (player.radius / 3),
                    global.gameHeight - player.position.y + global.gameHeight - player.position.y + global.screenHeight / 2 - (player.radius / 3), y);
            spin += increase;
            xstore[i] = x;
            ystore[i] = y;
        }
        /*if (wiggle >= player.radius/ 3) inc = -1;
         *if (wiggle <= player.radius / -3) inc = +1;
         *wiggle += inc;
         */
        for (i = 0; i < points; ++i) {
            if (i === 0) {
                graph.beginPath();
                graph.moveTo(xstore[i], ystore[i]);
            } else if (i > 0 && i < points - 1) {
                graph.lineTo(xstore[i], ystore[i]);
            } else {
                graph.lineTo(xstore[i], ystore[i]);
                graph.lineTo(xstore[0], ystore[0]);
            }

        }
        graph.lineJoin = 'round';
        graph.lineCap = 'round';
        graph.fill();
        graph.stroke();
        var img = new Image();
        img.src = URL.createObjectURL(rootPath + "/client/image/" + this.image);
        img.onload = function () {
            graph.drawImage(img,
                    circle.x - player.radius,
                    circle.y - player.radius,
                    player.size, player.size);
            URL.revokeObjectURL(img.src);
        };

        var nameCell = "";
        if (typeof (player.id) == "undefined")
            nameCell = player.name;
        else
            nameCell = player.name;
        var fontSize = Math.max(player.radius / 3, 12);
        graph.lineWidth = config.playerTextBorderSize;
        graph.fillStyle = config.playerTextColor;
        graph.strokeStyle = config.playerTextBorder;
        graph.miterLimit = 1;
        graph.lineJoin = 'round';
        graph.textAlign = 'center';
        graph.textBaseline = 'middle';
        graph.font = 'bold ' + fontSize + 'px sans-serif';
        graph.strokeText(nameCell, circle.x, circle.y + player.size);
        graph.fillText(nameCell, circle.x, circle.y + player.size);
    }

    toJSON() {
        return JSON.parse('{' +
                '"id":"' + this.id + '",' +
                '"socket":"' + this.socket + '",' +
                '"hue":' + this.hue + ',' +
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

    static drawFromJSON(json) {

    }

}

module.exports = Player;