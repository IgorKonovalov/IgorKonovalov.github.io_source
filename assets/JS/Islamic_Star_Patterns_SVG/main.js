
function HexagonalTiling(r) {
  this.polys = [];

  this.buildCell = function(x, y) {
    let p = new Polygon(6);
    for (let i = 0; i < 6; i++) {
      let point = {};
      let angle_deg = 60 * i;
      let angle_rad = Math.PI / 180 * angle_deg;
      point.x = x + r * Math.cos(angle_rad);
      point.y = y + r * Math.sin(angle_rad);
      p.addVertex(point.x, point.y);
    }
    p.close();
    this.polys.push(p);
  }

  this.buildGrid = function() {
    let h = r * 2;
    let w = (Math.sqrt(3) / 2) * h;
    let inc = 3 * (h / 4);
    let row = 0;
    for (let x = -h / 2; x < 700 + h/2; x += inc) {
      let startY = ((row % 2) == 0) ? -w : -w / 2;
      for (let y = startY; y < 540; y += w) {
        this.buildCell(x, y);
      }
      row++;
    }
  }
}
function arrayToPoints(array) {
  let points = [];
  for (let name in array) {
    points.push(array[name].x);
    points.push(' ');
    points.push(array[name].y);
    points.push(' ');
  }
  return points.join('');
}
function Edge(a, b) { // side of the polygon
  this.a = a;
  this.b = b;
  this.h1; // hankin objects - vectors for middle points
  this.h2;
  this.points = this.a;
  this.length = Math.sqrt(Math.pow((this.a.x - this.b.x), 2) + Math.pow((this.a.y - this.b.y), 2));

  this.hankin = function(alpha) {
    let mid = this.a.plus(this.b).multiply(.5); // middle between vertices
    let v1 = this.a.subtract(mid); // (this.a - mid) is a vector from second point to first
    let v2 = this.b.subtract(mid);
    let halfLength = v1.length;
    let offset1 = mid;
    let offset2 = mid;

    if (delta > 0) {
      if (delta > this.length / 2) delta = this.length / 2;
      v1 = v1.setMagnitude(Math.abs(delta));
      v2 = v2.setMagnitude(Math.abs(delta));
      offset1 = mid.plus(v2);
      offset2 = mid.plus(v1);
    }

    v1 = v1.setMagnitude(1); // normalize vectors
    v2 = v2.setMagnitude(1);

    angleRad = angle * Math.PI / 180;

    v1 = v1.rotate(-angleRad);
    v2 = v2.rotate(angleRad);

    alpha = alpha / 2;
    let beta = Math.PI - alpha - angleRad;
    let len = Math.sin(alpha) * ((halfLength + delta) / Math.sin(beta));

    v1 = v1.setMagnitude(len);
    v2 = v2.setMagnitude(len);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);

  }

}
function Vector(x, y) {
  this.x = x;
  this.y = y;
  this.length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.length = function () {
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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

Vector.prototype.subtract = function(other) {
	x = this.x - other.x;
	y = this.y - other.y;
	return new Vector(x, y);
}

Vector.prototype.rotate = function(angle) {
    x = Math.round(10000*(this.x * Math.cos(angle) - this.y * Math.sin(angle)))/10000;
    y = Math.round(10000*(this.x * Math.sin(angle) + this.y * Math.cos(angle)))/10000;
    return new Vector(x, y);
}

Vector.prototype.setMagnitude = function(magnitude) {
  x = this.x * magnitude / this.length;
  y = this.y * magnitude / this.length;
  return new Vector(x, y);
};

function Polygon(sides) {
  this.interiorAngle = ((sides - 2) * Math.PI) / sides;
  this.vertices = [];
  this.edges = [];

  this.addVertex = function(x, y) { // adding vertices
    let a = new Vector(x, y);
    let total = this.vertices.length;
    if (total > 0) {
      let prev = this.vertices[total - 1];
      let edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  this.close = function() { // closing figure
    let total = this.vertices.length;
    let last = this.vertices[total - 1];
    let first = this.vertices[0];
    let edge = new Edge(last, first);
    this.edges.push(edge);
  }

  this.getPolygonPoints = function() {
    let points = [];
    for (let i = 0; i < this.edges.length; i++) {
      points.push(this.edges[i].points);
    }
    return arrayToPoints(points);
  }

  this.getHankins = function() {
    let hankins = [];
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin(this.interiorAngle);
      let h1 = this.edges[i].h1;
      let h2 = this.edges[i].h2;
      hankins.push(h1.a.x);
      hankins.push(h1.a.y);
      hankins.push(h1.end.x);
      hankins.push(h1.end.y);
      hankins.push(h2.a.x);
      hankins.push(h2.a.y);
      hankins.push(h2.end.x);
      hankins.push(h2.end.y);
    }
    return hankins;
  }
}
function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.end = a.plus(v);
}
// SVG

const width = '700';
const height = '500';

const container = document.getElementById('svgContainer');
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttributeNS(null, "width", width + "px");
svg.setAttributeNS(null, "height", height + "px");
svg.setAttributeNS(null, "id", "starPattern");

// filter!

const defs = document.createElementNS(svgNS, 'defs');
const filter = document.createElementNS(svgNS, 'filter');
filter.setAttribute("id","f1");

const blur = document.createElementNS(svgNS, 'feGaussianBlur');
blur.setAttribute('stdDeviation', '1');

filter.appendChild(blur);
svg.appendChild(filter);




const deltaR = document.getElementById('delta');
const angleR = document.getElementById('angle');
const deltaRInc = document.getElementById('deltaInc');
const angleRInc = document.getElementById('angleInc');
const selectTiling = document.getElementById('tiling');
const elementArray = [deltaR, angleR, deltaRInc, angleRInc];


let angle, delta;


// задание начальных состояний

let polygons = [];

function squareTiling() {
  let inc = 100;
  for (let x = 0; x < width; x += inc) {
    for (let y = 0; y < height; y += inc) {
      let poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polygons.push(poly);
    }
  }
}

squareTiling();

function hexTiling() {
  var hexTiles = new HexagonalTiling(60);
  hexTiles.buildGrid();
  polygons = hexTiles.polys;
}

// hexTiling();

elementArray.forEach((elem)=> {
  elem.addEventListener('mousemove', () => {
    drawSVGhankins();
  })
})

elementArray.forEach((elem)=> {
  elem.addEventListener('touchmove', () => {
    drawSVGhankins();
  })
})


selectTiling.addEventListener('change', () => {
  let elements = [];
  if (selectTiling.value == "square") squareTiling();
  else if (selectTiling.value == "hex") hexTiling();
  elements = Array.prototype.slice.call(svg.childNodes);
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
  drawSVGGrid();
  drawSVGhankins();
})



function drawSVGGrid() { // creating grid with polygons and lines
  polygons.forEach((poly) => {
    const g = document.createElementNS(svgNS, 'g'); // container for SVG polygon and line
    g.setAttribute('class', 'tile');
    const cell = document.createElementNS(svgNS, 'polygon');
    cell.setAttribute('points', poly.getPolygonPoints());
    g.appendChild(cell);
    for (let i = 0; i < poly.edges.length * 2 ; i ++) {
      const line = document.createElementNS(svgNS, 'line');
      g.appendChild(line)
    }
    svg.appendChild(g);
  });
  container.appendChild(svg);
}


drawSVGGrid();


function drawSVGhankins() {
  let deltainc = 0;
  let angleinc = 0;
  polygons.forEach((poly, i) => {
    delta = Number(deltaR.value) + deltainc;
    angle = Number(angleR.value) + angleinc;
    const g = document.getElementsByTagName('g')[i];
    const lines = Array.prototype.slice.call(g.childNodes).slice(1);
    let hankinsCoord = poly.getHankins();
    let count = 4;
    for (let i = 0; i < lines.length ; i++) {
      lines[i].setAttribute('x1', hankinsCoord[count-4]);
      lines[i].setAttribute('y1', hankinsCoord[count-3]);
      lines[i].setAttribute('x2', hankinsCoord[count-2]);
      lines[i].setAttribute('y2', hankinsCoord[count-1]);
      count +=4
    }
    deltainc += Number(deltaRInc.value);
    angleinc += Number(angleRInc.value);
  });
}

drawSVGhankins();
