/*jshint expr:true */

var expect = require('chai').expect,
        Player = require('../src/server/lib/player'),
        config = require('../config.json');


/**
 * Tests for server/lib/player.js
 */

describe('player.js', function () {

    describe('#constructor', function () {
        it('should return the correct id and the correct socket', function () {
            var player = new Player(1, 1);
            expect(player.getId()).to.equal(1);
            expect(player.getSocket()).to.equal(1);
        });
        it('should have the correct speed', function () {
            var player = new Player(1, 1);
            expect(player.getSpeed()).to.equal(config.defaultPlayerSpeed);
        });
    });

    describe('#getSecondsSinceConnexion', function () {
        it('should use seconds', function () {
            var player = new Player(1, 1);
            expect(player.getSecondsSinceConnexion()).to.be.above(-1);
            expect(player.getSecondsSinceConnexion()).to.be.below(10);
        });
    });

    describe('#setName', function () {
        it('should only allow corrects names', function () {
            var player = new Player(1, 1);
            expect(player.setName('')).to.be.true;
            expect(player.setName('Walter_White')).to.be.true;
            expect(player.setName('Jesse_Pinkman')).to.be.true;
            expect(player.setName('hank')).to.be.true;
            expect(player.setName('marie_schrader12')).to.be.true;
            expect(player.setName('Йèæü')).to.be.false;
            expect(player.setName('Walter"White')).to.be.false;
            expect(player.setName('Walter White')).to.be.false;
            expect(player.getName()).to.be.equal('marie_schrader12');
        });
    });

    describe('#move', function () {
        it('should move like expected', function () {
            var player = new Player(1, 1);
            player.setSpeed(config.FPS);
            player.setTarget({x: 50, y: 0});
            player.move();
            expect(player.getPosition()).to.deep.equal({x: 1, y: 0});
            player.setSpeed(config.FPS * 2);
            player.setTarget({x: -50, y: 0});
            player.move();
            expect(player.getPosition()).to.deep.equal({x: -1, y: 0});
            player.setTarget({x: 0, y: 50});
            player.move();
            expect(player.getPosition()).to.deep.equal({x: -1, y: 2});
            player.setSpeed(config.FPS * 3);
            player.setTarget({x: 0, y: -50});
            player.move();
            expect(player.getPosition()).to.deep.equal({x: -1, y: -1});
        });

        it('should slow down if distance is short enough', function () {
            var player = new Player(1, 1);
            player.setSpeed(config.FPS);
            player.setTarget({x: (config.minimumDistTouchSlow - 1), y: 0});
            player.move();
            expect(player.getPosition()).to.not.deep.equal({x: 1, y: 0});
        });
    });
    
    describe('#toJSON', function () {
        it('should convert to JSON format', function () {
            var player = new Player(1, 1);
            player.setSpeed(config.FPS);
            player.setTarget({x: 50, y: 0});
            var json = player.toJSON();
            expect(json.speed).to.be.equal(config.FPS);
            expect(json.target.x).to.be.equal(50);
        });
    });
});
