/* jslint node: true, browser: true */

'use strict';
var config = require('../draw_config');
var global = require('../global');

class Player {
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
        graph.drawImage(document.getElementById(this.image),
                circle.x - player.radius,
                circle.y - player.radius,
                player.size, player.size);
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

    static drawFromJSON(player, graph, centre = {x: 0, y:0}) {
        player = JSON.parse(player);
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
            x: player.position.x - centre.x,
            y: player.position.y - centre.y,
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
        graph.drawImage(document.getElementById(player.image),
                circle.x - player.radius,
                circle.y - player.radius,
                player.size, player.size);
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

}

module.exports = Player;