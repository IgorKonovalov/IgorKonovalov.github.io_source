const canvas = document.querySelector("canvas");
const cx = canvas.getContext("2d");


function randomStep() {
  let random = randomNumber(0,4);
  let step = {};
  switch(random) {
    case 0:
      step.x = 1;
      step.y = 0;
      break;
    case 1:
      step.x = 0;
      step.y = 1;
      break;
    case 2:
      step.x = -1;
      step.y = 0;
      break;
    case 3:
      step.x = 0;
      step.y = -1;
      break;
  }
  return step;
}

function randomNumber(min, max) {
  return Math.floor((max-min) * Math.random());
}

function getRandomColor() {
  let max = 254;
  red = Math.floor(Math.random() * max);
  green = Math.floor(Math.random() * max);
  blue = Math.floor(Math.random() * max);
  color = "rgb(" + red + ", " + green + ", " + blue + ")";
  return color;
}

let position = {};
position.x = canvas.width / 2;
position.y = canvas.height / 2;
let radius = 1;

setInterval(() => {
  let step = randomStep();
  position.x += (step.x * 3);
  position.y += (step.y * 3);
  cx.beginPath();
  cx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
  cx.fillStyle = getRandomColor();
  cx.fill();
  cx.closePath();
}, 5)
