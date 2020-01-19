export class SoundModule {
  constructor() {
    let request = new XMLHttpRequest();
    request.open('GET', 'bug.ogg', true);
    request.responseType = 'arraybuffer';
  
    let source = audioContext.createBufferSource();
  
    let stereoPanner = audioContext.createStereoPanner();
    
    let userGainNode = audioContext.createGain();
  
    let bugVolumeRange = document.getElementById('bug-volume-slider');
    bugVolumeRange.oninput = () => userGainNode.gain.value = parseFloat(bugVolumeRange.value) / 2;
    userGainNode.gain.value = (bugVolumeRange.value = 0.5) / 2; //громкость исходного файла слишком высокая, поэтому сразу ее уменьшим на постоянное значение
  
    request.onload = function() {
      let audioData = request.response;
      
      audioContext.decodeAudioData(audioData, function(buffer) {
        source.loop = true;
        source.buffer = buffer;
  
        source.connect(userGainNode);
        userGainNode.connect(stereoPanner);
        stereoPanner.connect(audioContext.destination);
      });
    }
    
    request.send();
    source.start(0);

    this.setNewOptions =  function(position) {
      stereoPanner.pan.value = position.x  / 50;
    }
  }
}
