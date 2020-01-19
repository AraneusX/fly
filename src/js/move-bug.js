import {getNewParameter3D} from './utils';

export class MovementModule {
  constructor() {
    this.userSpeedRange = document.getElementById('bug-speed-slider');
    this.userSpeed =  this.userSpeedRange.value = 0.8;
    this.userSpeedRange.oninput = () => this.userSpeed = parseFloat(this.userSpeedRange.value);
  }

  getNewTrackModifer(startPoint, finishPoint) { // точка начала пути и условная точка конца пути
    let vectorSpeed = getNewParameter3D(); //векторная величина скорости
    
    let vectorTrack = (getNewParameter3D())
      .assign(finishPoint)
      .substrat(startPoint); //векторная величина пути

    let trackLength = Math.hypot(vectorTrack.x, vectorTrack.y, vectorTrack.z); //скалярная длина вектора пути
    
    let vectorAcceleration =  (getNewParameter3D())
      .assign(vectorTrack)                      //векторным ускорением будет нормализованный (т.е. длина = 1) вектор,кроме того уменьшеим его с помощью постояннго коэффициента 100 прямо влияющего на конечную скорость движения объекта
      .divide(trackLength * 100 / this.userSpeed);   // а также увеличим с помощью this.userSpeed
    
    let timeTrack =  100; //условная величина выражающаяся в количестве временных интервалов, отведенных на путь
    let currentTime = 0; //текущее время при прохождении пути от его начала
    let completion = 0; //процент завершения текущего пути
  
    function update() { //обновляет парамеров на кождом временном отрезке
      if (completion <= 50)  {
        vectorSpeed.add(vectorAcceleration);
      } else {
        vectorSpeed.substrat(vectorAcceleration);
      }
        
      currentTime ++;
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
