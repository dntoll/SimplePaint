export default class LineDrawView {
    #canvasContext;
    #isMouseDown;
    #lastPos;

    constructor(canvasContext) {
        this.#canvasContext = canvasContext;
    }

    mouseMove(x, y) {
        if (this.#isMouseDown) {
            this.#canvasContext.fillStyle = "#000000";
            this.#canvasContext.moveTo(this.#lastPos.x, this.#lastPos.y); 
            this.#canvasContext.lineTo(x, y); 
            this.#canvasContext.stroke();
            
            
        }
        this.#lastPos = {x: x, y:y};
    }

    mouseUp(x, y) {
        this.#isMouseDown = false
    }

    mouseDown(x, y) {
        this.#isMouseDown = true
        this.#lastPos = {x: x, y:y};

        this.#canvasContext.fillRect(x, y, 1, 1);

    }
}