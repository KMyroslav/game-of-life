/* 
Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
Any live cell with more than three live neighbors dies, as if by overcrowding.
Any live cell with two or three live neighbors lives on to the next generation.
Any dead cell with exactly three live neighbors becomes a live cell.
 */

let continious,
  curX,
  curY,
  random,
  start = 0;
const button = document.querySelector('.btn');
const buttonRst = document.querySelector('.btn-reset');
const buttonRnd = document.querySelector('.btn-random');
let canvas = document.querySelector('.canvas');
let canvas2D = document.querySelector('.canvas').getContext('2d');
const size = 12;
const width = canvas.clientWidth - (canvas.clientWidth % size);
const height = canvas.clientHeight - (canvas.clientHeight % size);
const cols = width / size;
const rows = height / size;
canvas.setAttribute('style', `width:${width}px; height:${height}px`);
canvas.setAttribute('width', `${width}`);
canvas.setAttribute('height', `${height}`);

canvas.onmousemove = function (e) {
  curX = Math.floor(e.offsetX / size);
  curY = Math.floor(e.offsetY / size);
};

canvas.onmousedown = function () {
  arr[curX][curY][2] = arr[curX][curY][2] === 0 ? 1 : 0;
  canvas2D.fillStyle = `rgb(
          0,
          0,
          ${Math.floor(Math.random() * 255)})`;
  if (arr[curX][curY][2] === 1) {
    canvas2D.fillRect(curX * size, curY * size, size, size);
  }
  if (arr[curX][curY][2] === 0) {
    canvas2D.clearRect(curX * size, curY * size, size, size);
  }
};

function make2Darray(random) {
  const arr = new Array(cols);
  for (let i = 0; i < cols; i += 1) {
    arr[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      if (random) {
        let z = Math.round(Math.random() / 1.65);
        arr[i][j] = [i, j, z];
      } else {
        arr[i][j] = [i, j, 0];
      }
      canvas2D.fillStyle = `rgb(
          0,
          0,
          ${Math.floor(Math.random() * 255)})`;
      if (arr[i][j][2] === 1) {
        canvas2D.fillRect(i * size, j * size, size, size);
      }
      if (arr[i][j][2] === 0) {
        canvas2D.clearRect(i * size, j * size, size, size);
      }
    }
  }
  return arr;
}

let arr = make2Darray(random);

function countNeighbors(i, j, array) {
  let count = 0;
  if (j - 1 >= 0) {
    if (array[i][j - 1][2] === 1) count += 1;
  }
  if (j - 1 >= 0 && i - 1 >= 0) {
    if (array[i - 1][j - 1][2] === 1) count += 1;
  }
  if (j - 1 >= 0 && i + 1 < cols) {
    if (array[i + 1][j - 1][2] === 1) count += 1;
  }
  if (i - 1 >= 0) {
    if (array[i - 1][j][2] === 1) count += 1;
  }
  if (i + 1 < cols) {
    if (array[i + 1][j][2] === 1) count += 1;
  }
  if (j + 1 < rows) {
    if (array[i][j + 1][2] === 1) count += 1;
  }
  if (j + 1 < rows && i - 1 >= 0) {
    if (array[i - 1][j + 1][2] === 1) count += 1;
  }
  if (j + 1 < rows && i + 1 < cols) {
    if (array[i + 1][j + 1][2] === 1) count += 1;
  }
  return count;
}

function gameOflife() {
  let arrCopy = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      let neighbors = countNeighbors(i, j, arrCopy);
      if (neighbors < 2) {
        arr[i][j][2] = 0;
      } else if (neighbors > 3) {
        arr[i][j][2] = 0;
      } else if (
        (arrCopy[i][j][2] === 1 && neighbors === 2) ||
        (arrCopy[i][j][2] === 1 && neighbors === 3)
      ) {
        arr[i][j][2] = 1;
      } else if (arrCopy[i][j][2] === 0 && neighbors === 3) {
        arr[i][j][2] = 1;
      }
      if (arr[i][j][2] === 1) {
        canvas2D.fillStyle = `rgb(
            0,
            0,
            ${Math.floor(Math.random() * 255)})`;
        canvas2D.fillRect(i * size, j * size, size, size);
      }
      if (arr[i][j][2] === 0) {
        canvas2D.clearRect(i * size, j * size, size, size);
      }
    }
  }
}

button.addEventListener('click', onBtnClick);
buttonRst.addEventListener('click', onRstBtnClick);
buttonRnd.addEventListener('click', onRndBtnClick);

function onRndBtnClick() {
  random = true;
  arr = make2Darray(random);
}

function onBtnClick() {
  start = start === 0 ? 1 : 0;
  if (start) {
    continious = setInterval(gameOflife, 75);
    button.textContent = 'Stop';
  } else {
    clearInterval(continious);
    button.textContent = 'Start';
  }
}

function onRstBtnClick() {
  random = false;
  arr = make2Darray(random);
}
