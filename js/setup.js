'use strict';
var WIZARDS_QUANTITY = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var wizards = [];

var setup = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var inputWizardCoat = document.querySelector('input[name=coat-color]');
var inputWizardEyes = document.querySelector('input[name=eyes-color]');
var inputWizardFireball = document.querySelector('input[name=fireball-color]');
var setupOpen = document.querySelector('.setup-open');
var setupCLose = setup.querySelector('.setup-close');
var wizardForm = document.querySelector('.setup-wizard-form');
var wizardName = wizardForm.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomInit = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var fillArray = function (arr) {
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    arr[i] = {
      name: WIZARD_NAMES[getRandomInit(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomInit(WIZARD_SURNAMES)],
      coatColor: COAT_COLORS[getRandomInit(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomInit(EYES_COLORS)]
    };
  }
};

var renderWizard = function (wizard) {
  var element = similarWizardTemplate.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return element;
};

var makeFragment = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  return fragment;
};

var isInFocus = function (element) {
  return element === document.activeElement;
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && (!isInFocus(wizardName))) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

var getColor = function (arr, element, input) {
  var color = arr[getRandomInit(arr)];
  if (element.parentElement === document.querySelector('.wizard')) {
    element.style.fill = color;
  } else if (element.parentElement === document.querySelector('.setup-player')) {
    element.style.backgroundColor = color;
  }
  input.value = color;
};

fillArray(wizards);

similarListElement.appendChild(makeFragment(wizards));

setup.querySelector('.setup-similar').classList.remove('hidden');

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCLose.addEventListener('click', closePopup);

setupCLose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  getColor(COAT_COLORS, wizardCoat, inputWizardCoat);
});

wizardEyes.addEventListener('click', function () {
  getColor(EYES_COLORS, wizardEyes, inputWizardEyes);
});

wizardFireball.addEventListener('click', function () {
  getColor(FIREBALL_COLORS, wizardFireball, inputWizardFireball);
});
