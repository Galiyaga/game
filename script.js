let minValue, maxValue, answerNumber, orderNumber, gameRun

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const arrPhrases = [`Вы загадали неправильное число!\n\u{1F914}`, `Я сдаюсь..\n\u{1F92F}`, `Магия вне Хогвардса запрещена\n\u{1F635}`, `Я так не играю!\n\u{1F610}`];
const arrPhrasesAnswer = [`Вы загадали число`, `Я уверена, что Вы загадали`, `Наверняка это`, `Я прочитала Ваши мысли, это -`];
const arrPhrasesEqual = [`Я в себе не сомневалась \n\u{1F61C}`, `Можешь взять реванш!`, `Я всегда угадываю\n\u{1F60E}`, `Пфф, пустяки!`];


function initGame() {
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;

    getPhrase(arrPhrasesAnswer, answerNumber);
}

function getPhrase(phraseArray, number = '') {
    const phraseIndex = Math.round( Math.random() *3);
    answerField.innerText = `${phraseArray[phraseIndex]} ${number}`
}

initGame();

document.getElementById('btnRetry').addEventListener('click', initGame)



document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            getPhrase(arrPhrases);
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);

            orderNumber++;
            orderNumberField.innerText = orderNumber;

            getPhrase(arrPhrasesAnswer, answerNumber);
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || minValue === answerNumber){
            getPhrase(arrPhrases);
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);

            orderNumber++;
            orderNumberField.innerText = orderNumber;

            getPhrase(arrPhrasesAnswer, answerNumber);
            answerField.innerText = `Вы загадали число ${ answerNumber }?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        getPhrase(arrPhrasesEqual);
        gameRun = false;
    }
})

