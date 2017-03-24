const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')
const inputN = document.getElementById('n')
const startB = document.getElementById('start')

const xStart = canvas.width/2
const yStart = canvas.height/2

let n, i, pathCounter, drawing, started, indexP
let points, path = []

startB.addEventListener('click', () => {
  if (!started) {
    startB.innerHTML = 'STOP'
    points = []
    i = 0
    pathCounter = 0
    path = []
    n = inputN.value
    getPoints(n)
    started = true
    drawing = setInterval(() => {
      drawRose(n)
      drawPath(i)
      i++
      if (n % 2 == 1) {
        if (i === 361) {
          i = 0
        }
      } else {
        if (i === 720) {
          i = 0
        }
      }

    }, 30)
  } else {
    startB.innerHTML = 'START'
    started = false
    console.log('cleared')
    clearInterval(drawing)
  }
})


drawRose = n => {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  cx.beginPath()
  cx.strokeStyle = 'white'
  cx.lineCap = 'round'
  cx.lineWidth = .3
  for (let a = 0; a < 360; a += 2) {
    deg = a * Math.PI / 180
    r = Math.sin(n * deg) * (xStart - 20)
    x = xStart + r * Math.cos(deg)
    y = xStart + r * Math.sin(deg)
    cx.lineTo(x, y)
  }
  cx.stroke()
}

getPoints = n => {
  for (let a = 0; a < 360; a += .5) {
    deg = a * Math.PI / 180
    r = Math.sin(n * deg) * (xStart - 20)
    x = xStart + r * Math.cos(deg)
    y = xStart + r * Math.sin(deg)
    points.push({x: x, y: y})
  }
}

drawPath = index => {
  if (pathCounter < 300) {
    path.push(index)
  } else {
    path.shift()
    path.push(index)
  }
  let lineW = 0
  for (let j = 0; j < pathCounter - 1; j++) {
    indexP = path[j]
    if (!indexP) indexP = index
    cx.strokeStyle = `hsl(${indexP}, 100%, 50%)`
    if (lineW < 17) lineW += .1
    cx.lineWidth = lineW
    cx.beginPath()
    if (indexP > 0) {
      cx.moveTo(points[indexP - 1].x, points[indexP - 1].y)
    }
    cx.lineTo(points[indexP].x, points[indexP].y)
    cx.stroke()
  }

  pathCounter++
}
