module.exports = {
  getNextRandomPoint,
  getRandomStartPosition,
  getNewParameter3D
};

function getRandomNum(min, max) {
  return (Math.random() * (max - min)) + min;
}
  
function getNextRandomPoint(centerPosition, movementLimit) {
  let point = getNewParameter3D();
  for (let variable in point) {
    point[variable] = getRandomNum(centerPosition[variable] - movementLimit[variable]/2,
    centerPosition[variable] + movementLimit[variable]/2);
    
    point[variable] += movementLimit[variable]/2 * Math.sign(point[variable] - centerPosition[variable]);
  }
  return point;
}

function getRandomStartPosition() {
  let x = getRandomNum(-20, 120);
  let y;
  
  if (x > 0 && x < 100) {
    y = getRandomNum(-20, 20);
    if (y > 0) {
      y += 100;
    } 
  } else {
    y = getRandomNum(-20, 120);
  }
  
  return getNewParameter3D(x, y, 0);
}


function getNewParameter3D(x = 0, y = 0, z = 0) {

  function isObjeсt(variable) {
    return(typeof variable === 'object')&&( !(variable === NaN) );
  }
    
  function calculateParameter3D(param3D, param_2, operator = '') {
    let calculate = new Function('arg_1', 'arg_2', `return arg_1 ${operator} arg_2`);
    
    if (isObjeсt(param_2)) {
      for (let variable in param3D) {
        if (param_2[variable]) {
            param3D[variable] = calculate(param3D[variable], param_2[variable]);
        }
      }
    } else {
      for (let variable in param3D) {
        param3D[variable] = calculate(param3D[variable], param_2);
      }
    }
  }
    
  class Parameter3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    assign(secondObjeсtOrValue) {
      calculateParameter3D(this, secondObjeсtOrValue, '=');
      return this;
    }

    add(secondObjeсtOrValue) {
      calculateParameter3D(this, secondObjeсtOrValue, '+');
      return this;
    }

    substrat(secondObjeсtOrValue) {
      calculateParameter3D(this, secondObjeсtOrValue, '-');
      return this;
    }

    multiply(secondObjeсtOrValue) {
      calculateParameter3D(this, secondObjeсtOrValue, '*');
      return this;
    }

    divide(secondObjeсtOrValue) {
      calculateParameter3D(this, secondObjeсtOrValue, '/');
      return this;
    }
  }

  return new Parameter3D(x, y, z);
}