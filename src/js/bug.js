import {Insect} from './insect';
import {getNewParameter3D} from './utils';
import {SoundModule} from './sound-bug';
import {MovementModule} from './move-bug';

export class Bug extends Insect {
  constructor(selector, position) {
    super(selector, position);

    this.movementLimit = getNewParameter3D(50, 50, 0);
    this.sound = new SoundModule();
    this.movement = new MovementModule();
  }

  setNewCSSOptions() {
    super.setNewCSSOptions();
  
    let rotateValue = Math.acos(
      Math.sign(this.vectorSpeed.y) * this.vectorSpeed.x / Math.hypot(this.vectorSpeed.x, this.vectorSpeed.y)
      );
    rotateValue += Math.PI / 2;
    this.elem.style.setProperty('--rotateValue',  rotateValue + 'rad');
  }
}