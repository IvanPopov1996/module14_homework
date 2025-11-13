let snake = [];
let direction = 'right';
let nextDirection = 'right';
let apple = {x: 0, y: 0};
let score = 0;
let gameInterval;
let isGameRunning = false;

function createField() {
    const field = document.getElementById('field');
    field.innerHTML = '';

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;  
            field.appendChild(cell);
        }
    }
}

// ========== ФУНКЦИИ ЗМЕЙКИ ==========

function createSnake() {
    snake = [
        {x: 5, y: 5},  // Голова в центре поля
        {x: 4, y: 5}   // Хвост слева от головы
    ];
    direction = 'right';
    nextDirection = 'right';
    
    updateSnake();
}

function updateSnake() {
    const snakeCells = document.querySelectorAll('.snake');
    snakeCells.forEach(cell => {
        cell.classList.remove('snake');
    });
    
    snake.forEach(segment => {
        const cell = document.querySelector(
            `.cell[data-x="${segment.x}"][data-y="${segment.y}"]`
        );

        if (cell) {
            cell.classList.add('snake');
        }
    });
}

function moveSnake() {
    direction = nextDirection;
    const head = {...snake[0]};

    switch (direction) {
        case 'up': 
            head.y = (head.y - 1 + 10) % 10; 
            break;
        case 'down': 
            head.y = (head.y + 1) % 10; 
            break;
        case 'left': 
            head.x = (head.x - 1 + 10) % 10; 
            break;
        case 'right': 
            head.x = (head.x + 1) % 10; 
            break;
    }
    snake.unshift(head);
    
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        document.getElementById('score').textContent = score;
        
        createApple();
        
    } else {
        snake.pop();
    }

    updateSnake();
}

function createApple() {
    let newX, newY;
    let found = false;
    
    while (!found) {
        newX = Math.floor(Math.random() * 10);
        newY = Math.floor(Math.random() * 10);
        
        found = true;
        
        for (let segment of snake) {
            if (segment.x === newX && segment.y === newY) {
                found = false;
                break;
            }
        }
    } 
    apple = {x: newX, y: newY};
    updateApple();
}

function updateApple() {
    const appleCells = document.querySelectorAll('.apple');
    appleCells.forEach(cell => {
        cell.classList.remove('apple');
    });
    
    const cell = document.querySelector(
        `.cell[data-x="${apple.x}"][data-y="${apple.y}"]`
    );    
    if (cell) {
        cell.classList.add('apple');
    }
}


document.addEventListener('keydown', function(event) {
    if (!isGameRunning) return;
    
    switch (event.key) {
        case 'ArrowUp': 
            if (direction !== 'down') {
                nextDirection = 'up';
            }
            break;
        case 'ArrowDown': 
            if (direction !== 'up') {
                nextDirection = 'down';
            }
            break;
        case 'ArrowLeft': 
            if (direction !== 'right') {
                nextDirection = 'left';
            }
            break;
        case 'ArrowRight': 
            if (direction !== 'left') {
                nextDirection = 'right';
            }
            break;
    }
});

function startGame() {
    score = 0;
    document.getElementById('score').textContent = '0';
    document.getElementById('gameOver').style.display = 'none';

    isGameRunning = true;
    createField();
    createSnake();
    createApple();
    gameInterval = setInterval(gameLoop, 500);
}

function gameLoop() {
    if (!isGameRunning) return;
    moveSnake();
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            endGame();
            return;
        }
    }
}

function endGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    document.getElementById('gameOver').style.display = 'block';
    saveBestScore();
}


function saveBestScore() {
    const bestScore = localStorage.getItem('snakeBestScore') || 0;
    if (score > bestScore) {
        localStorage.setItem('snakeBestScore', score);
    }
    
    showBestScore();
}

function showBestScore() {
    const bestScore = localStorage.getItem('snakeBestScore');
    if (bestScore) {
        document.getElementById('bestScore').textContent = bestScore;
        document.getElementById('bestScoreContainer').style.display = 'block';
    }
}

function restartGame() {
    clearInterval(gameInterval);
    startGame();
}

document.addEventListener('DOMContentLoaded', function() {
    showBestScore();
    createField();
    createSnake();
    createApple();
    document.getElementById('restartButton').addEventListener('click', restartGame);
    document.getElementById('field').addEventListener('click', startGame);
});