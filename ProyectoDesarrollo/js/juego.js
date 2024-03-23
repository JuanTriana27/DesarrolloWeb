window.onload = function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY];
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
}
