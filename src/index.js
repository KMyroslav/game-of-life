/* 
Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any live cell with two or three live neighbours lives on to the next generation.
Any dead cell with exactly three live neighbours becomes a live cell.
 */
const button = document.querySelector('.btn');
const width = document.querySelector('#canvas').getAttribute('width');
const canvas = document.querySelector('#canvas').getContext('2d');
const size = (width * 2) / 50;
const cols = width / size;

function countNeighbours(i, j, cols, arr) {
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
  if (j === cols - 1 && i === 0) {
    neighbours += arr[i + 1][j][2] + arr[i][j - 1][2] + arr[i + 1][j - 1][2];
    return neighbours;
  }
  if (j === 0 && i === cols - 1) {
    neighbours += arr[i][j + 1][2] + arr[i - 1][j][2] + arr[i - 1][j + 1][2];
    return neighbours;
  }
  if (j === cols - 1 && i === cols - 1) {
    neighbours += arr[i][j - 1][2] + arr[i - 1][j][2] + arr[i - 1][j - 1][2];
    return neighbours;
  }

  if (i === 0 && j !== 0 && j !== cols - 1) {
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
  if (i === cols - 1 && j !== 0 && j !== cols - 1) {
    neighbours +=
      arr[i - 1][j - 1][2] +
      arr[i - 1][j][2] +
      arr[i - 1][j + 1][2] +
      arr[i][j - 1][2] +
      arr[i][j + 1][2];
    return neighbours;
  }
  if (j === cols - 1 && i !== 0 && i !== cols - 1) {
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

const make2Darray = function (cols) {
  const arr = new Array(cols);
  for (let i = 0; i < cols; i += 1) {
    arr[i] = new Array(cols);
  }
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      let z = Math.round(Math.random() / 1.85);
      // if (j % 2 === 0) {
      //   z = Math.round(Math.random() / 1.5);
      // }
      arr[i][j] = [i, j, z];
    }
  }
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      arr[i][j].push(countNeighbours(i, j, cols, arr));
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

const arr = make2Darray(cols);

function gameOflife(arr, cols) {
  const arrCopy = [...arr];
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      let neighbours = countNeighbours(i, j, cols, arrCopy);
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

window.addEventListener('keypress', onBtnClick);

function onBtnClick() {
  gameOflife(arr, cols);
}
