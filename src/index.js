/* 
Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any live cell with two or three live neighbours lives on to the next generation.
Any dead cell with exactly three live neighbours becomes a live cell.
 */
let start = 0;
let continious;
const button = document.querySelector('.btn');
const buttonRst = document.querySelector('.btn-reset');
const width =
  document.querySelector('.canvas').clientWidth -
  (document.querySelector('.canvas').clientWidth % 2);
const height =
  document.querySelector('.canvas').clientHeight -
  (document.querySelector('.canvas').clientHeight % 2);
const canvas = document.querySelector('.canvas').getContext('2d');
const size = Math.round((width * height) / ((width * height) / 8));
const cols = Math.round(width / size);
const rows = Math.round(height / size);

document.querySelector('.canvas').setAttribute('width', `${width}`);
document.querySelector('.canvas').setAttribute('height', `${height}`);

function countNeighbours(i, j, arr) {
  /*
    let upL = arr[i - 1][j - 1][2];
    let up = arr[i - 1][j][2];
    let upR = arr[i - 1][j + 1][2];
    let L = arr[i][j - 1][2];
    let central = arr[i][j][2];
    let R = arr[i][j + 1][2];
    let downL = arr[i + 1][j - 1][2];
    let down = arr[i + 1][j][2];
    let downR = arr[i + 1][j + 1][2];
    */
  let neighbours = 0;
  if (j === 0 && i === 0) {
    neighbours += arr[i][j + 1][2] + arr[i + 1][j][2] + arr[i + 1][j + 1][2];
    return neighbours;
  }
  if (j === rows - 1 && i === 0) {
    neighbours += arr[i + 1][j][2] + arr[i][j - 1][2] + arr[i + 1][j - 1][2];
    return neighbours;
  }
  if (j === 0 && i === cols - 1) {
    neighbours += arr[i][j + 1][2] + arr[i - 1][j][2] + arr[i - 1][j + 1][2];
    return neighbours;
  }
  if (j === rows - 1 && i === cols - 1) {
    neighbours += arr[i][j - 1][2] + arr[i - 1][j][2] + arr[i - 1][j - 1][2];
    return neighbours;
  }

  if (i === 0 && j !== 0 && j !== rows - 1) {
    neighbours +=
      arr[i][j - 1][2] +
      arr[i][j + 1][2] +
      arr[i + 1][j - 1][2] +
      arr[i + 1][j][2] +
      arr[i + 1][j + 1][2];
    return neighbours;
  }
  if (j === 0 && i !== 0 && i !== cols - 1) {
    neighbours +=
      arr[i - 1][j][2] +
      arr[i - 1][j + 1][2] +
      arr[i][j + 1][2] +
      arr[i + 1][j][2] +
      arr[i + 1][j + 1][2];
    return neighbours;
  }
  if (i === cols - 1 && j !== 0 && j !== rows - 1) {
    neighbours +=
      arr[i - 1][j - 1][2] +
      arr[i - 1][j][2] +
      arr[i - 1][j + 1][2] +
      arr[i][j - 1][2] +
      arr[i][j + 1][2];
    return neighbours;
  }
  if (j === rows - 1 && i !== 0 && i !== cols - 1) {
    neighbours +=
      arr[i - 1][j - 1][2] +
      arr[i - 1][j][2] +
      arr[i][j - 1][2] +
      arr[i + 1][j - 1][2] +
      arr[i + 1][j][2];
    return neighbours;
  } else {
    neighbours +=
      arr[i - 1][j - 1][2] +
      arr[i - 1][j][2] +
      arr[i - 1][j + 1][2] +
      arr[i][j - 1][2] +
      arr[i][j + 1][2] +
      arr[i + 1][j - 1][2] +
      arr[i + 1][j][2] +
      arr[i + 1][j + 1][2];
    return neighbours;
  }
}

const make2Darray = function () {
  const arr = new Array(cols);
  for (let i = 0; i < cols; i += 1) {
    arr[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      let z;
      if (j % 2 === 0) {
        z = Math.round(Math.random() / 1.95);
      } else {
        z = Math.round(Math.random() / 1.9);
      }
      arr[i][j] = [i, j, z];
    }
  }
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      arr[i][j].push(countNeighbours(i, j, arr));
      if (arr[i][j][2] === 1) {
        canvas.fillStyle = `rgb(
            0,
            0,
            ${Math.floor(Math.random() * 255)})`;
        canvas.fillRect(i * size, j * size, size, size);
      }
      if (arr[i][j][2] === 0) {
        canvas.clearRect(i * size, j * size, size, size);
      }
    }
  }
  return arr;
};

let arr = make2Darray();

function gameOflife() {
  const arrCopy = [...arr];
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      let neighbours = countNeighbours(i, j, arrCopy);
      if (neighbours < 2) {
        arr[i][j][2] = 0;
      } else if (neighbours > 3) {
        arr[i][j][2] = 0;
      } else if ((arr[i][j][2] === 1 && neighbours === 2) || neighbours === 3) {
        arr[i][j][2] = 1;
      } else if (arr[i][j][2] === 0 && neighbours === 3) {
        arr[i][j][2] = 1;
      }

      if (arr[i][j][2] === 1) {
        canvas.fillStyle = `rgb(
            0,
            0,
            ${Math.floor(Math.random() * 255)})`;
        canvas.fillRect(i * size, j * size, size, size);
      }
      if (arr[i][j][2] === 0) {
        canvas.clearRect(i * size, j * size, size, size);
      }
    }
  }
}

button.addEventListener('click', onBtnClick);

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

buttonRst.addEventListener('click', onRstBtnClick);

function onRstBtnClick() {
  arr = make2Darray();
}
