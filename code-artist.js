// Get canvas element and 2D context to draw on it
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

// Get references to the buttons and input fields for user interaction
const drawTreeButton = document.getElementById("drawTree");
const clearCanvasButton = document.getElementById("clearCanvas");
const depthInput = document.getElementById("depth");

let drawing = false;  // Variable to check if drawing is ongoing
let currentStep = 0;  // Variable to track the current drawing step

// Function to draw a petal shape (used for leaves at the end of branches)
function drawPetal(x, y, size, angle, color) {
    ctx.save(); // Save the current drawing state (helps with transformations)

    // Move the canvas origin to the petal's position and rotate by the given angle
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Drawing the petal shape using two quadratic curves
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size / 2, -size * 1.5, 0, -size * 2); // Top curve of petal
    ctx.quadraticCurveTo(-size / 2, -size * 1.5, 0, 0); // Bottom curve of petal
    ctx.fillStyle = color;  // Set the fill color for the petal
    ctx.fill();  // Fill the petal with the chosen color

    ctx.restore(); // Restore the drawing state (undo translations and rotations)
}

// Function to draw the fractal tree recursively with animation
function drawFractalTree(x, y, size, angle, depth, delay) {
    if (depth === 0) return;  // Base case: stop recursion when depth reaches 0

    // Calculate the end point for the branch using trigonometry
    const endX = x + size * Math.cos(angle);
    const endY = y + size * Math.sin(angle);

    // Use setTimeout to delay each step of drawing for animation effect
    setTimeout(() => {
        // Draw the current branch (a line from (x, y) to (endX, endY))
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#6b4226'; // Set stroke color to brown (for tree trunk)
        ctx.lineWidth = depth;  // Line width depends on the current depth (thicker at the base)
        ctx.stroke();  // Apply the stroke to draw the line

        // If the depth is 1, draw petals at the end of the branch (forming leaves)
        if (depth === 1) {
            drawPetal(endX, endY, size / 3, Math.PI / 6, '#ff6b6b'); // Right petal (red)
            drawPetal(endX, endY, size / 3, -Math.PI / 6, '#ff6b6b'); // Left petal (red)
            drawPetal(endX, endY, size / 4, Math.PI / 2, '#ffdf6b'); // Top petal (yellow)
        }

        // Recursively draw the left and right branches
        const newSize = size * 0.7; // Reduce the size for the next iteration
        drawFractalTree(endX, endY, newSize, angle - Math.PI / 6, depth - 1, delay + 200); // Left branch
        drawFractalTree(endX, endY, newSize, angle + Math.PI / 6, depth - 1, delay + 200); // Right branch
    }, delay); // Delay each step for animation effect (using the 'delay' parameter)
}

// Event listener for the "Draw Tree" button
drawTreeButton.addEventListener("click", function() {
    const depth = parseInt(depthInput.value);  // Get the depth of the tree from the input field

    // If depth exceeds 10, we can restrict it or show a warning (currently no action)
    if (depth > 10 || depth<1) {
        // You can add logic to prevent drawing if the depth is too large
        alert("Invalid depth. Max is 10 and min is 1");
        return;// Prevent drawing if the depth is greater than 10
    }

    const x = canvas.width / 2;  // Start drawing from the middle of the canvas
    const y = canvas.height;     // Start drawing from the bottom of the canvas
    const length = 100;          // Starting length of the tree's main trunk
    const angle = -Math.PI / 2;  // Initial angle (upward direction)

    // Clear the canvas before drawing a new tree
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset drawing state
    currentStep = 0;
    drawing = true;

    // Start drawing the fractal tree (recursive function)
    drawFractalTree(x, y, length, angle, depth, 0);
});

// Event listener for the "Clear Canvas" button
clearCanvasButton.addEventListener("click", function() {
    // Clear the entire canvas and reset the drawing state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentStep = 0;
});
