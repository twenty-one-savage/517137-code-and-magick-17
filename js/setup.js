'use strict';
// Создаём пустой массив, который в дальнейшем будем заполянять, массив должен состоять из 4 элементов, сразу указываю
var wizards =[];
// Не знаю как лучше, завести константу?
wizards.length = 4;
// WIZARDS_LENGTH = 4;

// Показываем окно
var setup = document.querySelector('.setup');

// Находим элемент, куда будем вставлять похожих персонажей
var similarListElement = document.querySelector('.setup-similar-list');

// Находим шаблон волшебника
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Мокаем данные
var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var wizardSurnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Показываем окно на странице
setup.classList.remove('hidden');

// Функция для нахождения случайного индекса массива
var getRandomInit = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Функция для наполнения массива
var fillArray = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = {
      name: wizardNames[getRandomInit(wizardNames)] + ' ' + wizardSurnames[getRandomInit(wizardSurnames)],
      coatColor: coatColors[getRandomInit(coatColors)],
      eyesColor: eyesColors[getRandomInit(eyesColors)]
    }
  }
};

// Создаём массив
fillArray(wizards);

// Создаем DOM-элементы, далее эту функцию передадим в цикл
var renderWizard = function (wizard) {
  // Клонируем шаблон волшебника
  var element = similarWizardTemplate.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return element;
};


// Функция для создания фргамента, в котором будет наш массив
var makeFragment = function (arr) {
  // Создаем пустой фрагмент
  var fragment = document.createDocumentFragment();
  // Далее вставляем, в ранее созданный фрагмент, волшебников
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  return fragment;
};

// Вставляем содержимое фрагмента (наш массив) в DOM-дерево
similarListElement.appendChild(makeFragment(wizards));

// Отображаем блок "список похожих магов" на странице
setup.querySelector('.setup-similar').classList.remove('hidden');


