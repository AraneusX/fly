'use strict'

document.querySelector('.butt').addEventListener( "click", () => {
  let startWindow = document.querySelector('.welcome');
  let parametersWindow = document.querySelector('.parameters');
  let flyParameters = document.querySelector('.fly-parameters');
  let bugParameters = document.querySelector('.bug-parameters');

  parametersWindow.style.width = startWindow.offsetWidth + 'px';
  parametersWindow.style.height = startWindow.offsetHeight + 'px';
  flyParameters.style.width = (startWindow.offsetWidth / 2) + 'px';
  bugParameters.style.width = (startWindow.offsetWidth / 2) + 'px';

  startWindow.style.visibility = 'hidden';
  parametersWindow.style.visibility = 'visible';
      
  (function changeWidth() {
    let i = 1;
    function run() {
      if (flyParameters.offsetWidth > 50) {
        flyParameters.style.width = flyParameters.offsetWidth - i + 'px';
        bugParameters.style.width = bugParameters.offsetWidth - i + 'px';
        i++;
        setTimeout(run, 20);
      }else{
        flyParameters.style.width = '55px';
        bugParameters.style.width = '55px';
      }
    }
    run();
  })();

  (function changeHeight() {
    let i = 1;
    function run() {
      if (parametersWindow.offsetHeight < 210) {
        parametersWindow.style.height = parametersWindow.offsetHeight + i + 'px';
        i++;
        setTimeout(run, 20);
      }else{
        parametersWindow.style.height = '220px';
      }
    }
    run();
  })();

  (function changePosition() {
    let i = 1;
    function run() {
      if (parametersWindow.offsetWidth < innerWidth ) {
        parametersWindow.style.width = parametersWindow.offsetWidth + i + 'px';
        i += 2;
        setTimeout(run, 10);
      }else{
        parametersWindow.style.width = '100%';
      }
    }
    run();
  })();
}, {once:true});