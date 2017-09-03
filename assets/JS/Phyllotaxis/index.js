const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')
const button = document.getElementById('start')
const angleInput = document.getElementById('angle')

function degreeToRad(degree) {
  const rad = degree / 180 * Math.PI
  return rad
}

const centerX = canvas.width / 2
const centerY = canvas.height / 2

let drawingInterval
let n = 0
let c = 10
let running = false
let angle = Number(angleInput.value)

cx.fillStyle = 'white'

function draw(angle) {
  let a = degreeToRad(n * angle);
  let rad = c * Math.sqrt(n);
  let x = rad * Math.cos(a) + centerX;
  let y = rad * Math.sin(a) + centerY;
  cx.beginPath();
  cx.arc(x, y, 5, 0, 2 * Math.PI);
  cx.fillStyle = `hsl(${n * 0.6}, 100%, 50%)`
  cx.fill();
  if (rad > canvas.width / 2 - 20) {
    clearInterval(drawingInterval)
  }
  n++;
}

button.addEventListener('click', () => {
  if (running) {
    clearInterval(drawingInterval)
    button.innerHTML = 'START'
    running = false
  } else {
    cx.clearRect(0, 0, canvas.width, canvas.height)
    angle = angleInput.value
    n = 0
    drawingInterval = setInterval(()=> {
      draw(angle)
    }, 10)
    button.innerHTML = 'STOP'
    running = true
  }
})
