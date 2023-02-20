import Line from '../model/Line.js'

export default class LineDrawView {
    #canvasContext;
    #isMouseDown;
    #lastPos;
    #colorPickingView;
    #controller

    constructor(canvasContext, width, height, colorPickingView, controller) {
        const w = width
        const h = height
        this.#canvasContext = canvasContext;
        this.#controller = controller;

        this.#colorPickingView = colorPickingView
        this.#canvasContext.fillStyle = this.#colorPickingView.getActiveColor();
        this.#canvasContext.moveTo(0, 0);
        this.#canvasContext.lineTo(0, h); 
        this.#canvasContext.lineTo(w, h); 
        this.#canvasContext.lineTo(w, 0); 
        this.#canvasContext.lineTo(0, 0); 
        this.#canvasContext.stroke();

        this.drawOld()
    }

    drawOld() {
        const model = this.#controller.getModel()
        const lines = model.getLines()
        for (var key in lines) {
            const line = lines[key]
            this.#drawLine(line)
        }
    }

    #drawLine(line) {
        this.#canvasContext.beginPath();
        this.#canvasContext.moveTo(line.x, line.y); 
        this.#canvasContext.lineTo(line.toX, line.toY); 
        this.#canvasContext.strokeStyle = line.color;
        this.#canvasContext.stroke();
    }

    mouseMove(x, y) {
        if (this.#isMouseDown) {
            console.log(this.#canvasContext.fillStyle)
            let line = new Line(this.#lastPos.x, this.#lastPos.y, x, y, this.#colorPickingView.getActiveColor(), Date.now())
            this.#controller.drawLine(line)
            this.#drawLine(line)
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