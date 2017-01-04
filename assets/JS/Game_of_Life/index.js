
// начальные константы

const cx = document.querySelector("canvas").getContext("2d");
const scale = 20; // в будущем будет меняться
const rowCount = Math.floor(cx.canvas.height / scale);
const columnCount = Math.floor(cx.canvas.width / scale);
const color = "#0095DD";

console.log("columns: " + columnCount + " rows: " + rowCount);


// создаем массив клеток

let boxes = [];
for (let c = 0; c < columnCount; c++) {
  boxes[c] = [];
  for (let r = 0; r < rowCount; r++) {
    boxes[c][r] = {x: 0, y: 0, status: 0}; // получаем массив, с номером column, row, в котором лежит объект с кординатами 0,0 и статусом
  }
}

// рандомизируем статус клеток

function boxRandomize() {
  boxes.forEach(function(boxColumn) {
    boxColumn.forEach(function(box) {
      box.status = Math.round(Math.random()); // 1 или 0
    });
  });
}

// изменение состояния по клику

function clickOnBox(p, box) {
  return !(p.x < box.x ||
           p.y < box.y ||
           p.x > box.x + scale ||
           p.y > box.y + scale);
}


(function updateBoxOnClick() {
  document.getElementById("game").addEventListener("click", function(e) {
    let p = {x: e.offsetX, y: e.offsetY}; // обьект с позицией клика
    boxes.forEach(function(boxColumn) {
      boxColumn.forEach(function(box) {
        if (clickOnBox(p, box)) {
          if (box.status == 0) {
            box.status = 1;
            updateField();
          }
          else if (box.status == 1) {
            box.status = 0;
            updateField();
          }
        };
      });
    });
  });
})();

// отрисовка нового состояния поля

function drawBoxes(boxes) {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      let boxX = c * scale;
      let boxY = r * scale;
      boxes[c][r].x = boxX;
      boxes[c][r].y = boxY;
      if (boxes[c][r].status == 1) {
        cx.beginPath();
        cx.rect(boxX, boxY, scale, scale);
        cx.fillStyle = color;
        cx.fill();
        cx.closePath();
      }
    }
  }
}

function drawGrid() { // рисуем решетку
  cx.beginPath();
  cx.strokeStyle = "white";
  cx.lineWidth = .7;
  for (let i = 0; i < cx.canvas.height / scale; i++) {
    cx.moveTo(0, scale + scale * i);
    cx.lineTo(cx.canvas.width, scale + scale * i);
  }
  for (let i = 0; i < cx.canvas.width / scale; i++) {
    cx.moveTo(scale + scale * i, 0);
    cx.lineTo(scale + scale * i, cx.canvas.height);
  }
  cx.stroke();
}


function updateField() {
  cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
  drawBoxes(boxes);
  drawGrid();
  console.log("обновляю");
}

// логика



let boxesNextStep = [];
for (let c = 0; c < columnCount; c++) {
  boxesNextStep[c] = [];
  for (let r = 0; r < rowCount; r++) {
    boxesNextStep[c][r] = {x: 0, y: 0, status: 0};
  }
}

function getNextStep(boxes) {
  boxes.forEach(function(_, column) {
    _.forEach(function(box, row) {
      boxesNextStep[column][row].status = isAlive(boxes, column, row);
    })
  })
  return boxesNextStep;
}

function boxCopy(boxes, boxesNextStep) {
  boxes.forEach(function(_, column) {
    _.forEach(function(_, row) {
      boxes[column][row] = boxesNextStep[column][row];
    })
  })
  return boxes;
}

function cleanNextStep(boxesNextStep) {
  for (let c = 0; c < columnCount; c++) {
    boxesNextStep[c] = [];
    for (let r = 0; r < rowCount; r++) {
      boxesNextStep[c][r] = {x: 0, y: 0, status: 0};
    }
  }
  return boxesNextStep;
}

function isAlive(boxes, column, row) {
  let livecount = 0;
  let around = [];
  if ((column != 0) && (column != columnCount-1) && (row != 0) && (row != rowCount -1)) {
  //  console.log("внутри");
    around = [
      boxes[column][row-1].status,
      boxes[column+1][row-1].status,
      boxes[column+1][row].status,
      boxes[column+1][row+1].status,
      boxes[column][row+1].status,
      boxes[column-1][row+1].status,
      boxes[column-1][row].status,
      boxes[column-1][row-1].status
    ];
  } else if ((column == 0)&&(row == 0)) {
  //  console.log("лево верх");
    around = [
      boxes[column][rowCount-1].status,
      boxes[column+1][rowCount-1].status,
      boxes[column+1][row].status,
      boxes[column+1][row+1].status,
      boxes[column][row+1].status,
      boxes[columnCount-1][row+1].status,
      boxes[columnCount-1][row].status,
      boxes[columnCount-1][rowCount-1].status
    ];
  } else if ((column == columnCount -1)&&(row == rowCount-1)) {
  //  console.log("право низ");
    around = [
      boxes[column][row-1].status,
      boxes[0][row-1].status,
      boxes[0][row].status,
      boxes[0][0].status,
      boxes[column][0].status,
      boxes[column-1][0].status,
      boxes[column-1][row].status,
      boxes[column-1][row-1].status
    ];
  } else if ((column == 0)&&(row == rowCount -1 )) {
  //  console.log("лево низ");
    around = [
      boxes[column][row-1].status,
      boxes[column+1][row-1].status,
      boxes[column+1][row].status,
      boxes[column+1][0].status,
      boxes[column][0].status,
      boxes[columnCount-1][0].status,
      boxes[columnCount-1][row].status,
      boxes[columnCount-1][row-1].status
    ];
  } else if ((column == columnCount - 1) && (row == 0)) {
  //  console.log("право верх");
    around = [
      boxes[column][rowCount-1].status,
      boxes[0][rowCount-1].status,
      boxes[0][row].status,
      boxes[0][row+1].status,
      boxes[column][row+1].status,
      boxes[column-1][row+1].status,
      boxes[column-1][row].status,
      boxes[column-1][rowCount-1].status
    ];
  } else if (row == 0){
  //  console.log("верхняя полоса");
    around = [
      boxes[column][rowCount-1].status,
      boxes[column+1][rowCount-1].status,
      boxes[column+1][row].status,
      boxes[column+1][row+1].status,
      boxes[column][row+1].status,
      boxes[column-1][row+1].status,
      boxes[column-1][row].status,
      boxes[column-1][rowCount-1].status
    ];
  } else if (column == 0) {
  //  console.log("левая полоса");
    around = [
      boxes[column][row-1].status,
      boxes[column+1][row-1].status,
      boxes[column+1][row].status,
      boxes[column+1][row+1].status,
      boxes[column][row+1].status,
      boxes[columnCount-1][row+1].status,
      boxes[columnCount-1][row].status,
      boxes[columnCount-1][row-1].status
    ];
  } else if (row == rowCount-1){
  //  console.log("нижняя полоса");
    around = [
      boxes[column][row-1].status,
      boxes[column+1][row-1].status,
      boxes[column+1][row].status,
      boxes[column+1][0].status,
      boxes[column][0].status,
      boxes[column-1][0].status,
      boxes[column-1][row].status,
      boxes[column-1][row-1].status
    ];
  } else if (column == columnCount-1) {
  //  console.log("правая полоса");
    around = [
      boxes[column][row-1].status,
      boxes[0][row-1].status,
      boxes[0][row].status,
      boxes[0][row+1].status,
      boxes[column][row+1].status,
      boxes[column-1][row+1].status,
      boxes[column-1][row].status,
      boxes[column-1][row-1].status
    ];
  }
  livecount = around.reduce((a, b) => a + b);
  if ((boxes[column][row].status == 1)&&(livecount == 2)) {
    return 1;
  } else if ((livecount <= 2)) {
    return 0;
  } else if ((boxes[column][row].status == 1)&&(livecount == 3)) {
    return 1;
  } else if (livecount > 3) {
    return 0;
  } else if ((boxes[column][row].status == 0)&&(livecount == 3)) {
    return 1;
  } else console.log("что то не так" + livecount);

}

// кнопки

const bNext = document.getElementById("step");
bNext.addEventListener("click", function () {
  getNextStep(boxes)
  boxCopy(boxes, boxesNextStep);
  updateField();
  cleanNextStep(boxesNextStep);
});

const bRandom = document.getElementById("random");
bRandom.addEventListener("click", function () {
  boxRandomize();
  updateField();
});

const bStart = document.getElementById("start");
bStart.addEventListener("click", function () {
  let speedValue = document.getElementById("speed").value;
  timer = setInterval(function() {
    getNextStep(boxes)
    boxCopy(boxes, boxesNextStep);
    updateField();
    cleanNextStep(boxesNextStep);
  }, speedValue * 100);
})

const bPause = document.getElementById("pause");
bPause.addEventListener("click", function () {
  clearInterval(timer);
})

// начальный запуск

updateField();
