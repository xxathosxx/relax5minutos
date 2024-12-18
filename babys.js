const canvasBabys = document.getElementById('babysGame');
const ctxBabys = canvasBabys.getContext('2d');

let basket = { x: canvasBabys.width / 2 - 50, y: canvasBabys.height - 40, width: 100, height: 20 };
let babys = [];
let scoreBabys = 0;
let gameOverBabys = false;

function createBaby() {
    let baby = { x: Math.random() * (canvasBabys.width - 20), y: 0, width: 20, height: 20 };
    babys.push(baby);
}

function drawBasketBabys() {
    ctxBabys.fillStyle = 'blue';
    ctxBabys.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawBabys() {
    ctxBabys.fillStyle = 'pink';
    babys.forEach(baby => {
        ctxBabys.fillRect(baby.x, baby.y, baby.width, baby.height);
    });
}

function updateBabys() {
    babys.forEach(baby => {
        baby.y += 2;
    });

    babys = babys.filter(baby => baby.y < canvasBabys.height);

    babys.forEach(baby => {
        if (baby.x < basket.x + basket.width &&
            baby.x + baby.width > basket.x &&
            baby.y < basket.y + basket.height &&
            baby.y + baby.height > basket.y) {
            scoreBabys++;
            baby.y = canvasBabys.height;
        }
    });

    if (babys.length > 0 && babys[babys.length - 1].y > canvasBabys.height - 20) {
        gameOverBabys = true;
    }
}

function drawScoreBabys() {
    ctxBabys.font = '20px Arial';
    ctxBabys.fillStyle = 'black';
    ctxBabys.fillText(`Score: ${scoreBabys}`, 10, 30);
}

function gameLoopBabys() {
    ctxBabys.clearRect(0, 0, canvasBabys.width, canvasBabys.height);

    drawBasketBabys();
    drawBabys();
    updateBabys();
    drawScoreBabys();

    if (!gameOverBabys) {
        requestAnimationFrame(gameLoopBabys);
    } else {
        ctxBabys.font = '50px Arial';
        ctxBabys.fillStyle = 'red';
        ctxBabys.fillText('Game Over', canvasBabys.width / 2 - 150, canvasBabys.height / 2);
    }
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        basket.x -= 20;
    } else if (event.key === 'ArrowRight') {
        basket.x += 20;
    }
});

setInterval(createBaby, 1000);
gameLoopBabys();
