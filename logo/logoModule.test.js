describe("Square", () => {
    test("renders with a cool blue background", () => {
        const shape = new Square();
        shape.setColor("blue");
        expect(shape.render()).toEqual(
            '<rect x="50" y="50" width="200" height="100" fill="blue"/>'
        );
    });
});

describe("Triangle", () => {
    test("renders with a vibrant pink background", () => {
        const shape = new Triangle();
        shape.setColor("pink");
        expect(shape.render()).toEqual(
            '<polygon points="150, 18, 244, 182 56, 182" fill="pink"/>'
        );
    });
});

describe("Circle", () => {
    test("renders with a majestic purple background", () => {
        const shape = new Circle();
        shape.setColor("purple");
        expect(shape.render()).toEqual(
            '<circle cx="150" cy="100" r="80" fill="purple"/>'
        );
    });
});