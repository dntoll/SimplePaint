export default class LineWidthView {
    #canvasContext;
    #isMouseDown;
    #selectedWidth;

    constructor(canvasContext, width, height) {
        this.width = width
        this.height = height
        this.#canvasContext = canvasContext
        this.#selectedWidth = 1

        this.#canvasContext.fillStyle = "black"
        this.#canvasContext.strokeStyle = "black"
        for (let x = 0; x < width; x++) {
            
            this.#canvasContext.beginPath();
            this.#canvasContext.moveTo(x, 0); 
            this.#canvasContext.lineTo(x, x); 
            this.#canvasContext.stroke();
        }
    }

    mouseUp(x, y) {
        this.#isMouseDown = false

        this.selectedWidth = x
        console.log("Selected  at ", x)
    }

    getActiveColor() {
        return this.#canvasContext.fillStyle
    }

}