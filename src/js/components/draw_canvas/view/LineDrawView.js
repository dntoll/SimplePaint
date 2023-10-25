import Line from '../model/Line.js'
import LineSegment from '../model/LineSegment.js'

export default class LineDrawView {
    #canvasContext;
    #isMouseDown;
    #lastPos;
    #colorPickingView;
    #lineWidthView;
    #controller
    #currentline

    constructor(canvasContext, width, height, colorPickingView, lineWidthView, controller) {
        this.width = width
        this.height = height
        this.#canvasContext = canvasContext;
        this.#controller = controller;

        this.#colorPickingView = colorPickingView
        this.#lineWidthView = lineWidthView
        this.#canvasContext.fillStyle = this.#colorPickingView.getActiveColor();
        

        this.redraw()
    }

    redraw() {


        this.#canvasContext.fillStyle = "white";
        this.#canvasContext.fillRect(0,0, this.width, this.height)

        this.#canvasContext.strokeStyle = "black";
        this.#canvasContext.lineWidth = 1;
        this.#canvasContext.moveTo(0, 0);
        this.#canvasContext.lineTo(0, this.height); 
        this.#canvasContext.lineTo(this.width, this.height); 
        this.#canvasContext.lineTo(this.width, 0); 
        this.#canvasContext.lineTo(0, 0); 
        this.#canvasContext.stroke();

        const model = this.#controller.getModel()
        const lines = model.getLines()
        for (var key in lines) {
            const line = lines[key]
            for (var segkey in line.segments) {
                const segment = line.segments[segkey];
                this.#drawLine(line, segment);
            }
        }
    }

    #drawLine(line, segment) {
        if (segment.x == segment.toX && segment.y == segment.toY)
            this.#canvasContext.fillRect(segment.x, segment.y, 1, 1);
        else {
            this.#canvasContext.lineWidth = line.width;
            this.#canvasContext.lineJoin = "round";
            this.#canvasContext.lineCap = "round";
            this.#canvasContext.beginPath();
            this.#canvasContext.moveTo(segment.x, segment.y); 
            this.#canvasContext.lineTo(segment.toX, segment.toY); 
            this.#canvasContext.strokeStyle = line.color;
            this.#canvasContext.stroke();
        }
    }

    mouseMove(x, y) {
        if (this.#isMouseDown) {
            let segment = new LineSegment(this.#lastPos.x, this.#lastPos.y, x, y, Date.now())
            this.#controller.addLineSegment(segment)
            this.#drawLine(this.#currentline, segment)
        }
        this.#lastPos = {x: x, y:y};
    }

    mouseUp(x, y) {
        this.#isMouseDown = false
        console.log("Mouse was released", x, y)
    }

    mouseDown(x, y) {
        this.#isMouseDown = true
        this.#lastPos = {x: x, y:y};
        
        this.#currentline = new Line(this.#colorPickingView.getActiveColor(), this.#lineWidthView.selectedWidth, Date.now())
        this.#controller.newLine(this.#currentline)

        this.mouseMove(x, y)
    }
    
}