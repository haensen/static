/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

import levels from './levels.js';

class Motor extends Phaser.GameObjects.Particles.ParticleEmitter {
    rocket: Phaser.Physics.Matter.Sprite;
    isRightMotor: boolean;

    constructor(scene: Phaser.Scene, rocket: Phaser.Physics.Matter.Sprite, isRightMotor: boolean) {
        super(scene, rocket.x,rocket.y, 'flares', {
            frame: 'white',
            color: [ 0xfacc22, 0xf89800, 0xf83600, 0x9f0404 ],
            colorEase: 'quad.out',
            lifespan: 300,
            angle: { min: -100, max: -80 },
            scale: { start: 0.20, end: 0, ease: 'sine.out' },
            speed: 100,
            advance: 2000,
            blendMode: 'ADD'
        });
        this.rocket = rocket;
        this.isRightMotor = isRightMotor;
    }
    setOn(on: boolean) {
        this.emitting = on;
        // this.emitting = true;
    }
    update() {
        const directionModifier = this.isRightMotor ? 1 : -1;
        this.x = this.rocket.x;
        this.y = this.rocket.y;
        const offsetAngle = this.rocket.rotation - directionModifier * Math.PI/4*2.965 - Math.PI/2;
        const offsetAmount = 30;
        this.x += Math.cos(offsetAngle) * offsetAmount;
        this.y += Math.sin(offsetAngle) * offsetAmount;
        this.setAngle(this.rocket.angle - 180 + directionModifier * 30);
    }
};

class Level extends Phaser.Scene {
    config: Object;
    rocket: Phaser.Physics.Matter.Sprite;
    goal: Phaser.GameObjects.Sprite;
    waypoints: Phaser.GameObjects.Sprite[];
    planets: Phaser.GameObjects.Sprite[];
    leftMotor: Motor;
    rightMotor: Motor;
    hasEnded: boolean;
    goalReached: boolean;
    level: integer;

    constructor() {
        super({key: 'level'});
    }
    init(data: any) {
        this.config = levels[data.levelIndex];
        this.level = data.levelIndex;
        this.waypoints = [];
        this.planets = [];
        this.hasEnded = false;
        this.goalReached = false;
    }
    preload() {
        this.load.image('background', 'images/bg.jpg');
        this.load.image('rocket', 'images/rocket.png');
        this.load.atlas('flares', 'images/flares.png', 'images/flares.json');
        this.load.image('waypoint', 'images/banana.png');
        this.load.image('finish', 'images/finishFlag.png');
        for (let i = 1; i <= 6; i++) {
            this.load.image('planet'+i, 'images/'+i+'.png');
        }
    }
    create() {
        this.add.image(phaserConfig.width/2,phaserConfig.height/2,'background');

        this.add.text(0.5*phaserConfig.width, 0.04*phaserConfig.height, 'Level ' + (this.level+1), {
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);

        for (let text of this.config.texts) {
            this.add.text(text.x*phaserConfig.width, text.y*phaserConfig.height, text.text, {
                fontFamily: 'Comic Sans MS',
                fontSize: '24px',
                color: '#fff',
                stroke: '#777',
                strokeThickness: 6
            }).setOrigin(0.5);
        }

        this.goal = this.add.sprite(this.config.end.x * phaserConfig.width, this.config.end.y * phaserConfig.height, 'finish').setScale(0.03);

        for (let waypoint of this.config.waypoints) {
            const x = waypoint.x * phaserConfig.width;
            const y = waypoint.y * phaserConfig.height;
            const waypointObject = this.add.sprite(x,y, 'waypoint').setScale(0.08);
            this.waypoints.push(waypointObject);
        }
        for (let planet of this.config.planets) {
            const x = planet.x * phaserConfig.width;
            const y = planet.y * phaserConfig.height;
            const planetObject = this.add.sprite(x,y, planet.image).setDisplaySize(planet.radius*2,planet.radius*2);
            this.planets.push(planetObject);
        }

        {
            const x = this.config.start.x * phaserConfig.width;
            const y = this.config.start.y * phaserConfig.height;
            this.rocket = this.matter.add.sprite(x,y, 'rocket');
            this.rocket.scale = 0.3;
        }
        this.leftMotor = this.children.add(new Motor(this, this.rocket, false));
        this.rightMotor = this.children.add(new Motor(this, this.rocket, true));
    }
    update(timeNow: number, deltaMs: number) {
        const delta = deltaMs / 1000.0;

        const cursors = this.input.keyboard?.createCursorKeys();
        const rocketDirection = new Phaser.Math.Vector2(0,-1).rotate(this.rocket.rotation).scale(delta);
        const rocketPos = new Phaser.Math.Vector2(this.rocket.x, this.rocket.y);
        if (cursors?.left.isDown) {
            const shift = new Phaser.Math.Vector2(0,-1).rotate(this.rocket.rotation + Math.PI/2).scale(3000);
            this.rocket.applyForceFrom(shift.add(rocketPos), rocketDirection);
        }
        if (cursors?.right.isDown) {
            const shift = new Phaser.Math.Vector2(0,-1).rotate(this.rocket.rotation - Math.PI/2).scale(3000);
            this.rocket.applyForceFrom(shift.add(rocketPos), rocketDirection);
        }

        this.leftMotor.setOn(cursors?.left.isDown as boolean);
        this.rightMotor.setOn(cursors?.right.isDown as boolean);
        this.leftMotor.update();
        this.rightMotor.update();

        for (let i = 0; i < this.planets.length; i++) {
            const planetObject = this.planets[i];
            const planetConfig = this.config.planets[i];

            const weightProduct = 20 * planetConfig.weight;
            const rocketVec = new Phaser.Math.Vector2(this.rocket.body?.position);
            const planetVec = new Phaser.Math.Vector2(planetObject.x, planetObject.y);
            const distance = planetVec.distance(rocketVec);
            const angle = planetVec.subtract(rocketVec).angle();
            const force = weightProduct / distance * delta;
            const forceVector = new Phaser.Math.Vector2(1,0).setAngle(angle).scale(force);
            this.rocket.applyForce(forceVector);

            if (distance < (planetConfig.radius + this.rocket.displayWidth/2.0)) {
                this.hasEnded = true;
            }
        }

        for (let i = 0; i < this.waypoints.length; i++) {
            const waypoint = this.waypoints[i];
            const distance = (new Phaser.Math.Vector2(waypoint.x,waypoint.y)).distance(this.rocket.body?.position as Phaser.Math.Vector2);
            if (distance < 40) {
                waypoint.destroy();
                this.waypoints.splice(i, 1);
                i--;
            }
        }

        const distanceRocketToGoal = (new Phaser.Math.Vector2(this.goal.x,this.goal.y)).distance(this.rocket.body?.position as Phaser.Math.Vector2);
        if (distanceRocketToGoal < 40) {
            if (this.waypoints.length == 0) {
                this.goalReached = true;
                this.hasEnded = true;
            }
        }

        if (this.hasEnded) {
            let outcome = '';
            if (!this.goalReached) {
                outcome = 'failure';
            } else {
                outcome = 'finish';
            }
            this.scene.start('mainMenu', {outcome: outcome});
        }
    }
}

class GameFinished extends Phaser.Scene {
    constructor() {
        super({key: 'gameFinished'});
    }
    create(data: Object) {
        this.add.text(phaserConfig.width/2,phaserConfig.height/2, 'Congratulations!', {
            fontFamily: 'Comic Sans MS',
            fontSize: '48px',
            color: '#fff',
            stroke: '#777',
            strokeThickness: 6
        }).setOrigin(0.5);
        this.add.text(phaserConfig.width/2,phaserConfig.height/2+50, 'You passed the game on the ' + data.tries + 'st/nd/rd/th try.', {
            fontFamily: 'Comic Sans MS',
            fontSize: '24px',
            color: '#fff',
            stroke: '#777',
            strokeThickness: 6
        }).setOrigin(0.5);
    }
}

class MainMenu extends Phaser.Scene {
    static currentLevel: integer = 0;
    static tries: integer = 1;

    constructor() {
        super({key: 'mainMenu'});
    }
    init(data: Object) {
        if (data.outcome == undefined) return;
        if (data.outcome == 'failure') {
            MainMenu.tries++;
            return;
        } else {
            MainMenu.currentLevel++;
        }
    }
    update() {
        if (MainMenu.currentLevel < levels.length) {
            this.scene.start('level', {levelIndex: MainMenu.currentLevel});
        } else {
            this.scene.start('gameFinished', {tries: MainMenu.tries});
        }
    }
}

const phaserConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: [new MainMenu(), new Level(), new GameFinished()],
    physics: {
        default: 'Matter',
        matter: {
            gravity: {x:0,y:0},
        }
    },
};

const game = new Phaser.Game(phaserConfig);
