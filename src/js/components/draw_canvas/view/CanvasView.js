import LineDrawView from './LineDrawView.js'
import ColorSelectionView from './ColorSelectionView.js'
import LineWidthView from './LineWidthView.js'

import AppController from '../controller/AppController.js'
import LocalModel from '../model/LocalModel.js';


const template = document.createElement('template');
template.innerHTML = `
    <h1>Draw</h1>
    <button id='undoButton' type="button">Undo</button>
    <canvas id="colorPicker" width="256" height="256"></canvas>
    <canvas id="lineWidth" width="256" height="256"></canvas>
    <canvas id="myCanvas" width="1024" height="1024"></canvas>
`;


class CanvasView extends HTMLElement  {
    #canvas;
    #canvasContext;
    #activeToolView;
    #colorSelectionView;
    #lineWidthCanvas;
    #lineWidthContext
    #lineWidthView
    #pickerCanvas;
    #pickerCanvasContext;
    #undoButton;
    #mouseWasPressedOnArea = false;
    #controller = new AppController(new LocalModel())

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

         
        this.#pickerCanvas = this.shadowRoot.querySelector('#colorPicker')
        this.#pickerCanvasContext = this.#pickerCanvas.getContext("2d");
        const rect2 = this.#pickerCanvas.getBoundingClientRect()
        this.#colorSelectionView = new ColorSelectionView(this.#pickerCanvasContext, rect2.right- rect2.left, rect2.bottom-rect2.top)

        this.#lineWidthCanvas = this.shadowRoot.querySelector('#lineWidth')
        this.#lineWidthContext = this.#lineWidthCanvas.getContext("2d");
        const rect3 = this.#pickerCanvas.getBoundingClientRect()
        this.#lineWidthView = new LineWidthView(this.#lineWidthContext, rect3.right- rect3.left, rect3.bottom-rect3.top)

        this.#canvas = this.shadowRoot.querySelector('#myCanvas')
        this.#canvasContext = this.#canvas.getContext("2d");
        const rect = this.#canvas.getBoundingClientRect()
        this.#activeToolView = new LineDrawView(this.#canvasContext, rect.right- rect.left, rect.bottom-rect.top, this.#colorSelectionView, this.#lineWidthView, this.#controller)



        this.#undoButton = this.shadowRoot.querySelector("#undoButton")
    }

    connectedCallback() {
        //Warning note that we must use the => operator here otherwise will this be the canvas 
        this.#canvas.addEventListener("mousemove", e => this.mouseMove(e))
        
        //this does not seem to work, any of them actually but leaving the area should stop drawing action
        this.#canvas.addEventListener("onmouseleave", e => this.mouseUp(e, this.#activeToolView))
        this.#canvas.addEventListener("onmouseout", e => this.mouseUp(e, this.#activeToolView))
        this.#canvas.addEventListener("rollout", e => this.mouseUp(e, this.#activeToolView))

        //start and stop drawing
        this.#canvas.addEventListener("mousedown", e => this.mouseDown(e))
        this.#canvas.addEventListener("mouseup", e => this.mouseUp(e, this.#activeToolView))


        this.#pickerCanvas.addEventListener("mouseup", e => this.mouseUp(e, this.#colorSelectionView))
        this.#lineWidthCanvas.addEventListener("mouseup", e => this.mouseUp(e, this.#lineWidthView))


        this.#undoButton.addEventListener("click", e => this.undoClick(e))
        

        this.#canvas = this.shadowRoot.querySelector('#myCanvas')
    }

    undoClick(e) {
        console.log("undo")
        this.#controller.undo();

        this.#activeToolView.redraw()
    }

    mouseMove(e) {
        var rect = e.target.getBoundingClientRect();
        var x = parseInt((e.clientX - rect.left)); //x position within the element.
        var y = parseInt((e.clientY - rect.top));

        if (this.#mouseWasPressedOnArea && e.buttons == 0) { //mouse is pressed
            this.#mouseWasPressedOnArea = false
            this.#activeToolView.mouseUp(x,y) 
        } else {
            this.#activeToolView.mouseMove(x,y)
        }
    }

    mouseUp(e, view) {
        var rect = e.target.getBoundingClientRect();
        var x = parseInt((e.clientX - rect.left)); //x position within the element.
        var y = parseInt((e.clientY - rect.top));

        this.#mouseWasPressedOnArea = false
        view.mouseUp(x,y)
        
    }

    mouseDown(e) {
        var rect = e.target.getBoundingClientRect();
        var x = parseInt((e.clientX - rect.left)); //x position within the element.
        var y = parseInt((e.clientY - rect.top));

        this.#mouseWasPressedOnArea = true
        this.#activeToolView.mouseDown(x,y)
    }
}

window.customElements.define('my-canvas', CanvasView);