const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEL = document.querySelector('#time');
const board = document.querySelector('#board');

const colors = ['#FF0000', '#00FFFF', '#FF00FF', '#FFFF00', '#CC6600']

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // к массиву скринов первому добавляем класс uр
    screens[0].classList.add('up');
});

// Делегирование событий, клик только по кнопке
// Определяем какая кнопка нажата и сколько времени поместить в нее
timeList.addEventListener('click', event => {
if (event.target.classList.contains
    ('time-btn')) {
    // console.log(event.target);
    // console.log(event.target.getAttribute('data-time'));
    // для получения числа оборачиваем в parseInt и бросаем ее в переменную
    time = parseInt(event.target.getAttribute('data-time'))
    // меняем экран
    screens[1].classList.add('up')
    startGame()
}
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame () {
 setInterval (decreaseTime, 1000)
 createRandomCircle()
// подставляем время
// timeEL.innerHTML = `00:${time}`
    setTime(time)
}

function decreaseTime () {
    // каждую секунду отнимаем
    if (time === 0) {
    finishGame ()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
       //   timeEL.innerHTML = `00:${current}`
       setTime(current)
    }
}

function setTime(value) {
    timeEL.innerHTML = `00:${value}`
}

function finishGame () {
    // timeEL.parentNode.remove()
    timeEL.parentNode.classList.add('hide')
board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    board.append(circle)

    const size = getRandomNumber(10, 60)
    // const qqq = board.getBoundingClientRect()
    // console.log(qqq)
    // Используем деструктуризацию
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
 
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    const color = getRandomColor()
    circle.style.background = `${color}`
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

// Функция для случайного выбора числа, округляем
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// Функция для случайного выбора цвета, округляем
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

// winTheGame ()
// function winTheGame () {
// function kill() {
//     const circle = document.querySelector('.circle')
//     if (circle) {
//         circle.click()
//     }
// }
// setInterval(kill, 42)
// }


// можно сделать направление не дискретное, а вычисляемое

