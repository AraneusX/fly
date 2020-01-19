import {getNewParameter3D} from './utils.js';

export class MovementModule {
  constructor() {
    this.userSpeedRange = document.getElementById('fly-speed-slider');
    this.userSpeedRange.oninput = () => this.userSpeed = parseFloat(this.userSpeedRange.value);
    this.userSpeed = this.userSpeedRange.value = 0.8; //устанавливается начальное значение скорости и соответствующе положение ползунка
  }

  getNewTrackModifer(startPoint, finishPoint) { // точка начала пути и условная точка конца пути
    let vectorSpeed = getNewParameter3D(); //векторная величина скорости
    
    let vectorTrack = (getNewParameter3D())
      .assign(finishPoint)
      .substrat(startPoint); //векторная величина пути
    
    let trackLength = Math.hypot(vectorTrack.x, vectorTrack.y, vectorTrack.z ); //скалярная длина вектора пути
    
    let vectorAcceleration =  (getNewParameter3D())
      .assign(vectorTrack)                  //векторным ускорением будет нормализованный (т.е. длина = 1) вектор,кроме того уменьшеим его с помощью постояннго коэффициента 2 прямо влияющего на конечную скорость движения объекта
      .divide(trackLength * 2 / this.userSpeed)  // а также увеличим с помощью this.userSpeed
    
    let timeTrack = Math.round( Math.sqrt( trackLength / 0.4)); // Условная величина, выражающаяся в целом числе временных интервалов, за которое будет пройден путь. Вычислена по формуле равноускоренного движения при v0 = 0, a = 1. 
    
    let currentTime = 0; //текущее время при прохождении пути от его начала
    let growing = true;
    let completion = 0; //процент завершения текущего пути

    function update() { //обновляет парамеры на каждом временном отрезке
      if ((completion > 80) && growing) {
        vectorAcceleration.multiply(-4);
        growing = false;
      }
      
      vectorSpeed.add(vectorAcceleration);
      currentTime++;
      completion = Math.round(currentTime / timeTrack * 100);

      return vectorSpeed;
    }
    
    function getCompletion() {
      return completion;
    }

    return {
      update,
      getCompletion,
      isParent : false       //параметр, указывающий, был ли назначен новый путь при прохождении текущего
    };
  }
}