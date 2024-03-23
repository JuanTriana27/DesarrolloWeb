window.onload = function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let timerInterval;
    let score = 0;

    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY];
        
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return;
        context.strokeStyle = document.getElementById('colorPicker').value;
        context.lineWidth = 5;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        [lastX, lastY] = [event.offsetX, event.offsetY];
    });

    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    document.getElementById('clearButton').addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('backButton').addEventListener('click', () => {
        window.location.href = "../index.html";
    });

    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message !== '') {
            sendMessage(message);
            messageInput.value = '';
        }
    });

    function sendMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (message.toLowerCase() === document.getElementById('randomWord').textContent.toLowerCase()) {
            score += 20;
            alert('¡Ganaste 20 puntos!');
            console.log('Score:', score);
        }
    }

    function getRandomWord() {
        const words = ['Gato', 'Perro', 'Casa', 'Carro', 'Moto', 'Sol', 'Luna', 'Computador'];
        return words[Math.floor(Math.random() * words.length)];
    }

    function updateRandomWord() {
        currentWord = getRandomWord();
        const randomWordElement = document.getElementById('randomWord');
        randomWordElement.textContent = currentWord;
        randomWordElement.classList.add('chat-word');
    }

    function updateTimer() {
        const timerElement = document.getElementById('timer');
        let timer = parseInt(timerElement.textContent);
        if (timer === 0) {
            clearInterval(timerInterval);
            timer = 60;
            updateRandomWord();
            timerInterval = setInterval(updateTimer, 1000);
            alert("¡Tiempo agotado!");
        } else {
            timer--;
        }
        timerElement.textContent = timer;
    }

    updateRandomWord();
}
