'use strict';
var y;
var x;
for (x = 1; x < 21; x++) {
  for (y = 1; y < 21; y++) {
    document.write(`<div data-x="${x}" data-y="${y}" class="block" style="background-color: #4d363a; transform: translate(${x * 6}vh, ${y * 6}vh);" onclick="processclick(this)"></div>`);
  }
}

/**
 * 
 * @param {Element} elem 
 */

function processclick(elem) {
  console.log(elem.style['background-color']);
  if (elem.style['background-color'] === 'rgb(187, 187, 187)') {
    elem.style['background-color'] = 'green'
    matrix[elem.getAttribute('data-x')][elem.getAttribute('data-y')] = 'grass';
  } else if (elem.style['background-color'] === 'green') {
    elem.style['background-color'] = 'rgb(77, 54, 58)'
    matrix[elem.getAttribute('data-x')][elem.getAttribute('data-y')] = 'ground';
  } else {
    elem.style['background-color'] = 'rgb(187, 187, 187)'
    matrix[elem.getAttribute('data-x')][elem.getAttribute('data-y')] = 'rock';
  }
}

/**
 * 
 * @param {Number} rows 
 * @param {Number} columns 
 */

function blankMatrixArray(rows, columns) {
  var arr = new Array();
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array();
    for (var j = 0; j < columns; j++) {
      arr[i][j] = 'ground';
    }
  }
  return arr;
}
var matrix = blankMatrixArray(20, 20);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#generate-map').addEventListener('click', () => {
    let elem = document.createElement('a');
    elem.href = `data:application/json;base64, ${btoa(JSON.stringify(matrix, null, 2))}`;
    elem.download = 'map.json';
    elem.click();
  });
});
