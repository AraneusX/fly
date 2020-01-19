import {getNextRandomPoint, getNewParameter3D} from './utils.js';
export class Insect {
  constructor(selector, position = getNewParameter3D()) {
    this.currentPosition = position;
    this.centerPosition = getNewParameter3D(50, 50, 10);   //здесь
    this.movementLimit = getNewParameter3D(20, 20, 10);    //и здесь искуственно установим случайную z-координату и будем ее использовать в дальнейшем
      
    this.elem = document.querySelector(selector);
    this.relativePosition = (getNewParameter3D()).assign(this.currentPosition).substrat(this.centerPosition);
    this.vectorSpeed = getNewParameter3D();
  }
  
  move() {
    this.setNewCSSOptions();

    let  movementModifier = [];
    movementModifier[0] = this.movement.getNewTrackModifer(this.currentPosition, getNextRandomPoint(this.centerPosition, this.movementLimit));

    function run() {
      let shiftVectorSpeed = getNewParameter3D();

      for (let i = 0; i <=  movementModifier.length - 1; i++) {
        if (movementModifier[i].getCompletion() < 100) {
          shiftVectorSpeed.add(movementModifier[i].update());
        } else {
          movementModifier.shift();
        }

        if (( movementModifier[i].getCompletion() > 50) && (! movementModifier[i].isParent)) {
          movementModifier.push( this.movement.getNewTrackModifer(this.currentPosition, getNextRandomPoint(this.centerPosition, this.movementLimit)));
          movementModifier[i].isParent = true;
        }
      }

      this.vectorSpeed.assign(shiftVectorSpeed);
      
      this.setNewInsectPosition();
      
      setTimeout(runThis, 20);
    }

    let runThis = run.bind(this);
    runThis();
  }

  setNewCSSOptions() {
    this.elem.style.left = (this.currentPosition.x) + '%';
    this.elem.style.top = (this.currentPosition.y) + '%';
  }

  setNewInsectPosition() {
    this.currentPosition.add(this.vectorSpeed);
    this.relativePosition.assign(this.currentPosition).substrat(this.centerPosition);
    this.sound.setNewOptions(this.relativePosition, this.vectorSpeed);
    this.setNewCSSOptions();
  }
}