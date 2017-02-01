const canvas = document.querySelector("canvas");
const cx = canvas.getContext("2d");

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  x = this.x + other.x;
  y = this.y + other.y;
  return new Vector(x, y);
}

Vector.prototype.multiply = function(factor) {
  x = this.x * factor;
  y = this.y * factor;
  return new Vector(x, y)
}

Vector.prototype.random = function(length) {
  x = randomNumber(-length, length);
  y = Math.sqrt(Math.pow(length, 2) - Math.pow(x, 2)) * randomSign();
  return new Vector(x, y);
}

function randomNumber(min, max) {
  if (min > 0)
    return (max - min) * Math.random();
  else
    return (max - min) * Math.random() + min;
}

function randomSign() {
  let test = Math.round(Math.random() * 2);
  if (test == 1)
    return -1;
  else
    return 1;
}

let centerV = new Vector(canvas.width / 2, canvas.height / 2);

cx.strokeStyle="white";

function draw() {
  let rVector = new Vector;
  let length = 4;
  let randomChance = randomNumber(1, 100);
  if (randomChance < 10) {
    length = randomNumber(150,300);
  }
  cx.beginPath();
  cx.moveTo(centerV.x, centerV.y);
  if (centerV.x > canvas.width) {centerV.x += -100;}
  if (centerV.x < 0) {center.x += 100;}
  if (centerV.y > canvas.height) {centerV.y += -100;}
  if (centerV.y < 0) {centerV.y += 100;}
  let newCenter = centerV.plus(rVector.random(length));
  cx.lineTo(newCenter.x, newCenter.y);
  cx.closePath();
  cx.stroke();
  centerV = newCenter;
}

let timer = setInterval(() => {
  draw()
},200);

const stopB = document.getElementById('stopB');
stopB.addEventListener('click', () => {
  clearInterval(timer);
})
