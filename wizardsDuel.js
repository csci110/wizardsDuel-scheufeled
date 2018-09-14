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
        this.y = this.height;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("up", 0, 2);
        this.speedWhenWalking = 100;
        this.spellCastTime = 0;
        
    }
     handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
   handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
     handleSpacebar() {
        let spell = new Spell();
        let now = game.getTime(); // get the number of seconds since game start
        spell.x = this.x + this.width; // this sets the position of the spell object equal to
        spell.y = this.y; // the position of any object created from the PlayerWizard class
        spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.angle = 0;
        this.playAnimation("right");
        if (now - this.spellCastTime >= 2) {
            this.spellCastTime = now;
    } 
}
    handleGameLoop() {
        this.y = Math.max(5, this.y);
        this.y = Math.min(552, this.y);
    }
}

let marcus = new PlayerWizard();

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    handleBoundaryContact() {
        game.removeSprite(this);
    }
    handleCollision(otherSprite) {
        if (this.getImage() !== otherSprite.getImage()) {
            let verticalOffset = Math.abs(this.y - otherSprite.y);
            if (verticalOffset < this.height / 2) {
                game.removeSprite(this);
                new Fireball(otherSprite);
            }
        }
        return false;
    }
}

class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The mysterious stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("left", 10, 12);
        this.defineAnimation("down", 7, 8);
        this.playAnimation("down");

    }
    handleGameLoop() {
        this.y = Math.max(0, this.y);
        this.y = Math.min(552, this.y);
        if (this.y <= 0) {
            this.y = 0;
            this.angle = 270;
            this.playAnimation("down");
        }
        if (this.y >= game.displayHeight - this.height) {
            this.y = game.displayHeight - this.height;
            this.angle = 90;
            this.playAnimation("up");
        }
        if (Math.random() < 0.01) {
            let spell = new Spell();
            spell.x = this.x - this.width;
            spell.y = this.y; 
            spell.name = "A spell cast by the Stranger";
            spell.setImage("strangerSpellSheet.png");
            spell.angle = 180;
            this.playAnimation("left");
        }
    }
    handleAnimationEnd() {
        if (this.angle === 90) {
            this.playAnimation("up");
        }
        if (this.angle === 270) {
            this.playAnimation("down");
        }
    }
}

let stranger = new NonPlayerWizard();


class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        this.name = "a ball of fire.";
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 16);
        this.playAnimation("explode");
    }
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated the mysterious" +
                "\nstranger in the dark cloak!");
        }
        if (!game.isActiveSprite(marcus)) {
            game.end("Marcus is defeated by the mysterious\nstranger in the dark cloak!" +
                "\n\nBetter luck next time.");
        }
    }
}