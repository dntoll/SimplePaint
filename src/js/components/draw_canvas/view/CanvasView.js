

const template = document.createElement('template');
template.innerHTML = `
    <h1>Hej</h1>
    <canvas id="myCanvas" width="1024" height="1024" />
`;


class CanvasView extends HTMLElement  {
    #canvas;
    #canvasContext;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#canvas = this.shadowRoot.querySelector('canvas')
        this.#canvasContext = this.#canvas.getContext("2d");
        
        this.#canvasContext.fillRect(0, 0, 100, 100);
    }

    connectedCallback() {
        let f= function(e) { 
                this.mousemove(e)
            }
        this.#canvas.addEventListener("mousemove", f)
    }

    mousemove(e) {
        var rect = e.target.getBoundingClientRect();
        var x = parseInt((e.clientX - rect.left)); //x position within the element.
        var y = parseInt((e.clientY - rect.top));  
        this.#canvasContext.fillRect(x, y, 100, 100);
    }
}

window.customElements.define('my-canvas', CanvasView);