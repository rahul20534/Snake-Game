let inputdir = { x: 0, y: 0 };
const board = document.getElementById('board');
let foodsound = new Audio('music/food.mp3');
let gameoversound = new Audio('music/gameover.mp3');
let movesound = new Audio('music/move.mp3');
let musicsound = new Audio('music/music.mp3');
let scoreElement = document.getElementById('score');
let score = 0;
let speed = 5;
let lastpainttime = 0;
let snakearr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameengine();
}

function iscollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true; // Should return true if collision occurs
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true; // Should return true if collision occurs
    }
    return false; // Should return false if no collision occurs
}

function gameengine() {
    if (iscollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        inputdir = { x: 0, y: 0 };
        alert("Game over. Press any key to play again!");
        snakearr = [{ x: 13, y: 15 }];
        score = 0;
        scoreElement.innerText = "score: " + score;
        musicsound.play();
    }

    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        score += 1;
        scoreElement.innerText = "score: " + score;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeelement.classList.add('head');
        } else {
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });

    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}

window.requestAnimationFrame(main);

document.addEventListener('keydown', e => {
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputdir.y !== 1) {
                inputdir.x = 0;
                inputdir.y = -1;
            }
            break;
        case "ArrowDown":
            if (inputdir.y !== -1) {
                inputdir.x = 0;
                inputdir.y = 1;
            }
            break;
        case "ArrowLeft":
            if (inputdir.x !== 1) {
                inputdir.x = -1;
                inputdir.y = 0;
            }
            break;
        case "ArrowRight":
            if (inputdir.x !== -1) {
                inputdir.x = 1;
                inputdir.y = 0;
            }
            break;
        default:
            break;
    }
});
