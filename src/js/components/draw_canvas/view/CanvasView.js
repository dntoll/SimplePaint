import LineDrawView from './LineDrawView.js'

const template = document.createElement('template');
template.innerHTML = `
    <h1>Draw</h1>
    <canvas id="myCanvas" width="1024" height="1024" />
`;


class CanvasView extends HTMLElement  {
    #canvas;
    #canvasContext;
    #activeToolView;
    #mouseWasPressedOnArea = false;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#canvas = this.shadowRoot.querySelector('canvas')
        this.#canvasContext = this.#canvas.getContext("2d");
        
        this.#activeToolView = new LineDrawView(this.#canvasContext)
    }

    connectedCallback() {
        //Warning note that we must use the => operator here otherwise will this be the canvas 
        this.#canvas.addEventListener("mousemove", e => this.mouseMove(e))
        
        this.#canvas.addEventListener("onmouseleave", e => this.mouseUp(e))
        this.#canvas.addEventListener("onmouseout", e => this.mouseUp(e))
        this.#canvas.addEventListener("rollout", e => this.mouseUp(e))
        this.#canvas.addEventListener("mouseup", e => this.mouseUp(e))
         
        
        this.#canvas.addEventListener("mousedown", e => this.mouseDown(e))
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

    mouseUp(e) {
        var rect = e.target.getBoundingClientRect();
        var x = parseInt((e.clientX - rect.left)); //x position within the element.
        var y = parseInt((e.clientY - rect.top));

        this.#mouseWasPressedOnArea = false
        this.#activeToolView.mouseUp(x,y)
        
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