class MainMenu extends Phaser.Scene {
    static currentLevel: integer = 0;
    static tries: integer = 1;
    static levelCount: integer;

    constructor(levelCount: integer) {
        super({key: 'mainMenu'});
        MainMenu.levelCount = levelCount;
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
        if (MainMenu.currentLevel < MainMenu.levelCount) {
            this.scene.start('level', {levelIndex: MainMenu.currentLevel});
        } else {
            this.scene.start('gameFinished', {tries: MainMenu.tries});
        }
    }
}

export default MainMenu;
