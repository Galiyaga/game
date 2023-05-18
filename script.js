let minValue, maxValue, answerNumber, orderNumber, gameRun

let minValueInput = document.querySelector('.min');
let maxValueInput = document.querySelector('.max');
let btnLess = document.querySelector("#btnLess");
let btnOver = document.querySelector("#btnOver");
let btnEqual = document.querySelector("#btnEqual");
let btnSubmit = document.querySelector("#btnSubmit");

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
// массивы фраз
const failPhrases = [`Вы загадали неправильное число!\n\u{1F914}`, `Я сдаюсь..\n\u{1F92F}`, `Магия вне Хогвардса запрещена\n\u{1F635}`, `Я так не играю!\n\u{1F610}`];
const answerPhrases = [`Вы загадали число`, `Я уверена, что Вы загадали`, `Наверняка это`, `Я прочитала Ваши мысли, это -`];
const winPhrases = [`Я в себе не сомневалась \n\u{1F61C}`, `Можешь взять реванш!`, `Я всегда угадываю\n\u{1F60E}`, `Пфф, пустяки!`];
// массивы чисел в текстовой форме
const ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

// Устанавливаем обработчики событий изменения для полей ввода
minValueInput.addEventListener("input", checkInputs);
maxValueInput.addEventListener("input", checkInputs);

// Функция для проверки полей ввода и блокировки/разблокировки кнопок
function checkInputs() {
    if (minValueInput.value && maxValueInput.value) {
        // Если оба поля ввода заполнены, то разблокируем кнопки
        btnLess.disabled = false;
        btnOver.disabled = false;
        btnEqual.disabled = false;
        btnSubmit.disabled = false;
    } else {
        // Если хотя бы одно из полей пустое, то блокируем кнопки
        btnLess.disabled = true;
        btnOver.disabled = true;
        btnEqual.disabled = true;
        btnSubmit.disabled = true;
    }
}
// функция для проверки максимального и минимального значения числа
function onSubmit () {      

    minValue = parseInt(minValueInput.value) || 0;
    maxValue = parseInt(maxValueInput.value) || 100;

    if (minValue < -999) minValue = -999;
    if (maxValue > 999) maxValue = 999;

    initGame();
}
// функция для обновления игры и опустошения полей
function onRetry() {
    minValueInput.value = ''
    maxValueInput.value = ''
}

// функция для запуска игры
function initGame() {
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;

    getPhrase(answerPhrases, answerNumber);
}

// функция для выбора фразы и проверки длины символов
function getPhrase(phraseArray, number = '') {
    const phraseIndex = Math.round( Math.random() *3);
    const numberAsText = numberToText(number);

    answerField.innerText = `${phraseArray[phraseIndex]} ${numberAsText.length > 20 ? number : numberAsText}`
}
// функция для выведения числа текстом
function numberToText(number) {
    if (number === 0) return 'ноль';
    if (number < 0) return 'минус ' + numberToText(-number);

    let numText = '';
    let hundredsCount = Math.floor(number / 100);
    let tensCount = Math.floor(number / 10) % 10;
    let onesCount = number % 10;

    if (hundredsCount > 0) {
        numText += hundreds[hundredsCount] + ' ';
    }
    if (tensCount === 1) {
        numText += teens[onesCount] + ' ';
    } else {
        numText += tens[tensCount] + ' ';
        numText += ones[onesCount] + ' ';
    }

    return numText.trim();
}
// кнопка больше
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            getPhrase(failPhrases);
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);

            orderNumber++;
            orderNumberField.innerText = orderNumber;

            getPhrase(answerPhrases, answerNumber);
        }
    }
})
// кнопка меньше
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || minValue === answerNumber){
            getPhrase(failPhrases);
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);

            orderNumber++;
            orderNumberField.innerText = orderNumber;

            getPhrase(answerPhrases, answerNumber);
        }
    }
})
// кнопка заново
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        getPhrase(winPhrases);
        gameRun = false;
    }
})

