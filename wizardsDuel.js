import { game, Sprite } from "./sgc/sgc.js";

game.setBackground("floor.png");
game.showScore = true;

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.setImage("marcusSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.y;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 6, 8);
        this.speedWhenWalking = 100;
        
    } 
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
   handleUpArrowKey() {
       this.playAnimation("up");
       this.speed = this.speedWhenWalking;
       this.angle = 90;
   }
   handleGameLoop () { // Keep Marucs in the display area
        this.y = Math.max(5, this.y);
        this.y = Math.min(552, this.y);
   }
}   

let marcus = new PlayerWizard();

class Spell extends Sprite {
    constructor() {
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    handleSpaceBar() {
        let spell = new Spell();
        spell.x = this.x;  // this sets the position of the spell object equal to
        spell.y = this.y;  // the position of any object created from the PlayerWizard class
        this.name = "A spell cast by Marcus";
        this.setImage("marcusSpellSheet.png");
        this.angle = 0;
    }
    handleBoundaryContract() {
        //Delete spell when it leaves display area
        game.removeSprite(this);
    }
}
