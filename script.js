window.addEventListener('load', function () {
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = this.window.innerHeight;

  //Canvas Setting
  ctx.fillStyle = 'lightBlue';
  ctx.strokeStyle = 'white';
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  // function writeText() {
  //   c.textAlign = "center";
  
  //   c.font = ' 30px Anton';
  //   c.fillStyle = 'white';
  //   c.fillText('Created on', canvas.width/2, canvas.height/3);
  
  //   c.font = '150px Anton';
  //   c.lineWidth = 4;
  //   c.strokeStyle = 'white';
  //   c.strokeText('01 April 2024', canvas.width/2, canvas.height/2);
  
  //   c.font = ' 70px Anton';
  //   c.fillStyle = 'white';
  //   c.fillText('Captain Red', canvas.width/2, (canvas.height/20)*13);
  // }

  //Effect settings
  let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
  const maxLevel = 5;
  const branches = 2;

  let sides = 5;
  let spread = -0.2;
  let scale = .55;
  let color = 'hsl(' + Math.random() * 360 + ',100%,50%)';
  let lineWidth = 15;//Math.floor(Math.random() * 20 + 10);

  //controls
  const randomizeButton = document.getElementById('randomizeButton');
  const resetButton = document.getElementById('resetButton');

  const slider_spread = this.document.getElementById('spread');
  const label_spread = this.document.querySelector('[for="spread"]');
  slider_spread.addEventListener('change', function (e) {
    spread = e.target.value;
    updateSliders();
    drawFractal();
  });

  slider_sides = document.getElementById('sides');
  label_sides = document.querySelector('[for="sides"]');
  slider_sides.addEventListener('change', function (e) {
    sides = e.target.value;
    updateSliders();
    drawFractal();
  });

  let pointX = 0;
  let pointY = size;
  function drawBranch(level) {
    if (level > maxLevel) return;
    ctx.beginPath();
    //ctx.moveTo(pointX, pointY);
    ctx.moveTo(0,0);
     ctx.lineTo(size, 0);
    //ctx.bezierCurveTp(size, 0,20,20,30,30);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      //ctx.translate(pointX,pointY);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      // ctx.save();
      // ctx.rotate(-spread);
      // drawBranch(level + 1);
      // ctx.restore();

      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);

      // ctx.beginPath();
      // ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
      // ctx.fill();
    }
    ctx.restore();
    randomizeButton.style.background = color;
  }
  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2);
    spread = Math.random() * 2.9 + 0.1;
    // scale = Math.random() * 0.4 + 0.4;
    color = 'hsl(' + Math.random() * 360 + ',100%,50%)';
    lineWidth = Math.floor(Math.random() * 30 + 20)
  }
  randomizeButton.addEventListener('click', function () {
    randomizeFractal();
    updateSliders();
    drawFractal();
  });

  function resetFractal() {
    sides = 15;
    spread = 0.85;
    scale = 0.2;
    color = 'hsl(100%,100%,100%)';
    lineWidth = 15;
  }
  resetButton.addEventListener('click', function () {
    resetFractal();
    updateSliders();
    drawFractal();
  });

  function updateSliders() {
    slider_spread.value = spread;
    label_spread.innerText = 'Spread: ' + Number(spread).toFixed(1);

    slider_sides.value = sides;
    label_sides.innerText = 'Sides: ' + sides;
  }
  updateSliders();

  this.window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = this.window.innerHeight;
    size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;

    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    
    drawFractal();
  });

  
  

});