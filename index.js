const inquirer = require("inquirer");
const fs = require("fs");

const { Square, Triangle, Circle } = require("./logo/logo.js");

function promptUser() {
    console.log("🚀 Welcome to the Cool Logo Generator! 🚀");

    inquirer
        .prompt([
        {
            type: "input",
            name: "text",
            message: "🔠 --- Enter 3 letters for your logo:",
        },
        {
            type: "input",
            name: "textColor",
            message: "🌈 --- Enter a color (keyword or hexadecimal) for text color:",
        },
        {
            type: "list",
            name: "shape",
            message: "🎨 --- Choose the shape of your logo:",
            choices: ["Square", "Triangle", "Circle"],
        },
        {
            type: "input",
            name: "shapeColor",
            message: "🌈 --- Enter a color (keyword or hexadecimal) for the shape color:",
        },
    ])
        .then((answers) => {
        if (answers.text.length > 3) {
            console.log("⚠️ Max of only 3 characters. Try again!");
            promptUser();
        } else {
            generateLogo("logo.svg", answers);
        }
    });
}

function generateLogo(fileName, answers) {
    let svgLogo = `
<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <g>
        `;

    let selectedShape;
    switch (answers.shape) {
        case "Square":
            selectedShape = new Square();
            svgLogo += `<rect x="50" y="50" width="200" height="100" fill="${answers.shapeColor}"/>`;
            break;
        case "Triangle":
            selectedShape = new Triangle();
            svgLogo += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
            break;
        case "Circle":
            selectedShape = new Circle();
            svgLogo += `<circle cx="150" cy="100" r="80" fill="${answers.shapeColor}"/>`;
            break;
    }

    svgLogo += `
        <text x="150" y="125" text-anchor="middle" font-size="50" fill="${answers.textColor}">${answers.text}</text>
    </g>
</svg>`;

    fs.writeFile(fileName, svgLogo, (err) => {
        if (err) {
            console.error("❌ Oops! Something went wrong:", err);
        } else {
            console.log("✨ Logo Generated Successfully! Check out 'logo.svg' ✨");
        }
    });
}

promptUser();
