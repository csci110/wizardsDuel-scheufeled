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
        this.defineAnimation("right", 3, 5);
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

let marcus = new PlayerWizard;

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    handleSpaceBar() {
        let spell = new Spell();
        spell.x = this.x + this.width; 
        spell.y = this.y; 
        this.name = "A spell cast by Marcus";
        this.setImage("marcusSpellSheet.png");
        this.angle = 0;
        this.playAnimation("right");
    }
    
    handleBoundaryContract() {
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
        }
    }
    
    class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The Mysterious Stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
    }
    
    handleGameLoop() {
        
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
        
        if (this.angle === 90) {
            this.playAnimation("up");
            }
        
        if (this.angle === 270) {
        this.playAnimation("down");
            }
            
        let spell = new Spell();
        spell.x = this.x - this.width;
        spell.y = this.y;
        spell.name = "A spell cast by the Dark Wizard";
        spell.setImage("strangerSpellSheet.png");
        spell.angle = 180;
        this.playAnimation("left");
        
    }
}

class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        this.name = "A Ball of Fire";
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 16);
        this.playAnimation("explode");
        
    }
    
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated The Mysterious"
            + "\nStranger in the Dark Cloak!");
            }
        }
    }
    
        let stranger = new NonPlayerWizard();