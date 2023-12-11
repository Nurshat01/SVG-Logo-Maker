const fs = require('fs');
const prompt = require('prompt-sync')();
const { createCanvas, loadImage } = require('canvas');

const isBrowser = typeof window !== 'undefined' && window.document && typeof window.document.createElement === 'function';





function factory(w, d) {
    if (isBrowser) {
        return {
            createCanvas: function (width, height) {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                return canvas;
            },
            loadImage: function (src) {
                const image = new Image();
                image.src = src;
                return image;
            }
        };
    } else {
        return {
            createCanvas: createCanvas,
            loadImage: loadImage
        };
    }
}


//------------------------------------------------------
module.exports = isBrowser ? factory(window, document) : factory();




function generateLogo(text, textColor, shape, shapeColor, width = 300, height = 200) {
    const canvas = module.exports;

    if (!canvas.createCanvas || typeof canvas.createCanvas !== 'function') {
        throw new Error("Canvas object is not properly initialized or doesn't support the expected methods.");
    }

    const ctx = canvas.createCanvas(width, height).getContext('2d');

    if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 100, 0, 2 * Math.PI);
        ctx.fillStyle = shapeColor;
        ctx.fill();
    } else if (shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 100);
        ctx.lineTo(width / 2 - 86.6, height / 2 + 50);
        ctx.lineTo(width / 2 + 86.6, height / 2 + 50);
        ctx.closePath();
        ctx.fillStyle = shapeColor;
        ctx.fill();
    } else if (shape === 'square') {
        ctx.fillStyle = shapeColor;
        ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);
    }

    ctx.fillStyle = textColor;
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, height - 20);

    const buffer = canvas.createCanvas(width, height).toBuffer('image/png');
    fs.writeFileSync('logo.png', buffer);
    console.log('Generated logo.png');
}

//-------------------------------------------------------------------------------

function getUserInput() {
    const text = prompt('Enter up to three characters for the text: ').slice(0, 3);
    const textColor = prompt('Enter text color (keyword or hexadecimal): ');

    const shapes = ['circle', 'triangle', 'square'];
    let shape = prompt(`Choose a shape (${shapes.join(', ')}): `).toLowerCase();
    while (!shapes.includes(shape)) {
        console.log('Invalid shape. Please choose from:', shapes.join(', '));
        shape = prompt('Choose a shape: ').toLowerCase();
    }

    const shapeColor = prompt('Enter shape color (keyword or hexadecimal): ');

    return { text, textColor, shape, shapeColor };
}


//---------------------------------------------------
function main() {
    const { text, textColor, shape, shapeColor } = getUserInput();
    generateLogo(text, textColor, shape, shapeColor);
}

module.exports.generateLogo = generateLogo;
module.exports.getUserInput = getUserInput;
module.exports.main = main;
