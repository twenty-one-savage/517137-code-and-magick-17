'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_X = CLOUD_X + BAR_GAP;
var BAR_Y = 80;
var FONT_X = BAR_X;
var FONT_Y = 250;
var BAR_MAX_HEIGHT = 150;
var timeHeight = 0;
var currentBarHeight = 0;

// Функция для отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция для отрисовки текста
var drawText = function (ctx, i, times, names) {
  // Выводим время
  ctx.fillText(Math.round(times[i]), FONT_X + (BAR_GAP + BAR_WIDTH) * i, timeHeight + BAR_Y);
  // Выводим имя
  ctx.fillText(names[i], FONT_X + (BAR_GAP + BAR_WIDTH) * i, FONT_Y + GAP);
};

// Функция для отрисовки диаграммы
var drawDiagram = function (ctx, i) {
  // Выводим диаграмму
  ctx.fillRect(BAR_X + (BAR_GAP + BAR_WIDTH) * i, BAR_Y + BAR_MAX_HEIGHT, BAR_WIDTH, -currentBarHeight + 2 * GAP);
};

// Функция сортировки массива
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Задаём тип шрифта
  ctx.font = '16px PT Mono';

  ctx.fillStyle = '#000';
  ctx.fillText('Ура, вы победили!', 230, 30);
  ctx.fillText('Список Результатов:', 230, 50);

  // Находим максимальное время
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    currentBarHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    timeHeight = BAR_MAX_HEIGHT - currentBarHeight;

    ctx.fillStyle = '#000';
    drawText(ctx, i, times, names);
    // Залитие столбца цветом, в зависимости от того Вы это или нет
    names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random().toFixed(2) + ')';
    drawDiagram(ctx, i, currentBarHeight);
  }
};
