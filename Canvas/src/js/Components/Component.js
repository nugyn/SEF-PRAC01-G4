import GameEngine from '../GameEngine';
import { InvalidMoveException } from '../Exceptions/InvalidMoveException';
export class Component {
    constructor(id, x, y, object, name, npc) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.npc = npc;
        this.size = object.bSize;
        this.object = object.object;
        this.controllable = false;
        this.grid = object.grid;
    }

    getPosition() {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        }
    }

    control(boolean) {
        this.controllable = boolean;
    }

    getPotentialMove(direction) {
        let potentialMove;
        switch(direction) {
            case 'up':
                potentialMove = this.y - this.size;
                break;
            case 'down':
                potentialMove = this.y + this.size;
                break;
            case 'left':
                potentialMove = this.x - this.size;
                break;
            case 'right':
                potentialMove = this.x + this.size;
                break;
        }
        let indX = (direction == 'left' || direction =='right') ? potentialMove/this.size : this.x/this.size;
        let indY = (direction == 'up' || direction =='down') ? potentialMove/this.size : this.y/this.size
        return this.grid[indY][indX];
    }

    logError(e) {
        if(e instanceof TypeError) {
            console.warn("Can't move beyond the grid");
        } else {
            console.warn(e.getMessage());
        }
    }
    moveRight() {
        try{
            if(this.getPotentialMove('right') == 1) {
                this.x += this.size;
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('right'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveLeft() {
        try{
            if(this.getPotentialMove('left') == 1) {
                this.x -= this.size;
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('left'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveUp() {
        try{
            if(this.getPotentialMove('up') == 1) {
                this.y -= this.size;
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('up'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    moveDown() {
        try{
            if(this.getPotentialMove('down') == 1) {
                this.y += this.size;
                return true;
            } else {
                throw new InvalidMoveException(this.getPotentialMove('down'));
            }
        } catch (e){
            this.logError(e);
        }
    }

    render(){
        document.querySelector(".debug").innerHTML = "Player: x{" + this.x + "} y{" + this.y + "}";
        this.object.fillRect(this.x,this.y,this.size,this.size);
        this.object.fillStyle = GameEngine.getColor().border;
        this.object.font="13px Arial";
        this.object.textAlign = "center";
        this.object.textBaseline="middle";
        this.object.fillText(this.name,this.x + this.size/2,this.y + this.size/2);
        return this.getPosition();
    }
}