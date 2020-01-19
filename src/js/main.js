'use strict'

import {getRandomStartPosition} from './utils.js';
import {Fly} from './fly.js';
import {Bug} from './bug.js';


document.querySelector('.butt').addEventListener( "click", () => {
  window.audioContext = new(window.AudioContext || window.webkitAudioContext)(); //создается аудио контекст

  document.querySelector('.container').onmouseleave = () => audioContext.suspend();
  document.querySelector('.container').onmouseenter = () => audioContext.resume();

  let fly = new Fly('.fly', getRandomStartPosition());
  fly.move();

  let bug = new Bug('.bug', getRandomStartPosition());
  bug.move();
}, {once:true});