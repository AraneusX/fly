export class SoundModule {
  constructor() {
    let insectSound = audioContext.createOscillator();  // создается звуковой инструмент
    insectSound.type = 'sawtooth';                      //вид волны
    insectSound.frequency.value = 340;                  //частота звука
  
    let insectSoundOptions = {  
      positionX : 50,    //
      positionY : 50,    // параметры позиции источника звука в пространстве
      positionZ : 50,    //
      refDistance: 1,     //
      maxDistance: 100,  //
    }
  
    let insectSoundPanner = new PannerNode(audioContext, insectSoundOptions); //создается модулятор, положение в пространстве
    
    let userGainNode = audioContext.createGain(); //создается регулятор громкости
    
    let flyVolumeRange = document.getElementById('fly-volume-slider');
    flyVolumeRange.oninput = () => userGainNode.gain.value = parseFloat(flyVolumeRange.value);
    userGainNode.gain.value = flyVolumeRange.value = 0.5; //устанавливается первоначальное значение громкости и соответствующе положение ползунка на регуляторе
    
    insectSound.connect(insectSoundPanner);               //подключаем осцилятор к модулятору
    insectSoundPanner.connect(userGainNode);  //подключаем модулятор к регулятору громкости
    userGainNode.connect(audioContext.destination); //подключаем регулятор громкости к выводу
    
    insectSound.start();  //включение осцилятора
  
    this.setNewOptions = function(position, speed) { //функция изменения звучания
      let frequency = 340 + Math.round(Math.hypot(speed.x, speed.y, speed.z));
      insectSoundPanner.setPosition(position.x, position.y, position.z);
      insectSound.frequency.value = frequency;
    }
  }
}