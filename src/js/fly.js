import {Insect} from './insect.js';
import {getNewParameter3D} from './utils.js';
import {SoundModule} from './sound-fly';
import {MovementModule} from './move-fly';

export class Fly extends Insect {
  constructor(selector, position) {
    super(selector, position);

    this.movementLimit = getNewParameter3D(20, 20, 50);
    this.sound = new SoundModule();
    this.movement = new MovementModule();

    window.onmousemove = () => {
      this.centerPosition.x = window.event.clientX / innerWidth * 100;
      this.centerPosition.y = window.event.clientY / innerHeight * 100;
    }
  }

  setNewCSSOptions() {
    super.setNewCSSOptions();

    let scaleValue = 1 - (this.currentPosition.z / this.movementLimit.z / 10); // здесь число 10 задает коэфициент уменьшения масштаба при удалении объекта по оси z, подобрано визуально
    this.elem.style.setProperty('--scaleValue', scaleValue);
  }
}
  