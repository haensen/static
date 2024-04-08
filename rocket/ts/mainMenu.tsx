import React from "react";
import {createRoot} from "react-dom/client";
import levelStorage from "./levelStorage";

function LevelButton(props) {
    return <div onClick={props.onClick} className={`level-button ${props.status}`}><h1>{props.level}</h1></div>;
}

function LevelMenu(props) {
    const maxEnabled = levelStorage.getMaxPassed() + 1;
    const buttons = Array(props.levels).fill(0).map((_, i) =>
        <LevelButton 
        status={i+1 <= maxEnabled ? "enabled" : "disabled"}
        level={i+1}
        key={i}
        onClick={i+1 <= maxEnabled ? () => props.levelOpener(i) : ()=>{}}
        />
    );
    return <div className="level-menu">{buttons}</div>;
}

class MainMenu extends Phaser.Scene {
    static levelCount: integer;
    static guiRoot = undefined;

    constructor(levelCount: integer) {
        super({key: 'mainMenu'});
        MainMenu.levelCount = levelCount;
    }
    update() {
        this.hideLoadingText();
        this.showLevelMenu();
    }
    hideLoadingText() {
        const gui = document.getElementsByClassName("loading")[0];
        if (gui != undefined) gui.className = "gui hidden";
    }
    showLevelMenu() {
        const gui = document.getElementsByClassName("gui")[0];
        gui.className = "gui level-menu";
        if (MainMenu.guiRoot == undefined) {
            MainMenu.guiRoot = createRoot(gui);
        }
        MainMenu.guiRoot.render(<LevelMenu levelOpener={this.openLevel.bind(this)} levels={MainMenu.levelCount} />);
    }
    hideLevelMenu() {
        const gui = document.getElementsByClassName("gui")[0];
        gui.className = "gui hidden";
    }
    openLevel(level: integer) {
        this.scene.start('level', {levelIndex: level});
        this.hideLevelMenu();
    }
}

export default MainMenu;
