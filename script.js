

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.shadowOffsetX =  0;
ctx.shadowOffsetY = 0;
ctx.shadowColor = 'gold';
let audioSource;
let analyser;

container.addEventListener('click', function() {
   
    const audio1 = document.getElementById('audio1');
    audio1.src =  'kan.mp3';
    const audioCtx = new AudioContext();
    audio1.play();

  


    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = 15;
    let barHeight;
    let x = 0;

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray)
        requestAnimationFrame(animate);

    }
    animate();
});


file.addEventListener('change', function() {
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
  });

  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 64;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 15;
  let barHeight;
  let x ;

  function animate() {
      x = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);
      drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray)
      requestAnimationFrame(animate);

  }
  animate();

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
 
    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 0.7;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i * 2.2);
        ctx.shadowBlur = 50;
        const hue = 190 + i * barHeight;
        ctx.strokeStyle =  'hsl(' + hue + ',100%,  50%)';
        ctx.fillStyle =  'hsl(' + hue + ',100%,  50%)';
        ctx.lineWidth = barHeight/20  > 0.2 ? barHeight/20  : 0.2;
        ctx.beginPath();
        ctx.arc(barHeight + 75, barHeight + 75, 50,   0, Math.PI * 2);
        ctx.moveTo(barHeight + 110, barHeight + 75);
        ctx.arc(barHeight + 75, barHeight + 75, 35, 0, Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(barHeight + 65,barHeight + 65);
        ctx.arc(barHeight + 60,barHeight + 65, 5, 0, Math.PI * 2);
        ctx.moveTo(barHeight + 95,barHeight + 65);
        ctx.arc(barHeight + 90,barHeight + 65, 5, 0, Math.PI * 2);
        ctx.fill();
        x += barWidth;
        ctx.restore();
    }
   
}

window.addEventListener('resize',
function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  drawVisualizer();
}
)



