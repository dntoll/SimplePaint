

const template = document.createElement('template');
template.innerHTML = `
    <h1>Hej</h1>
    <canvas id="myCanvas" width="1024" height="1024" />
`;


class CanvasView extends HTMLElement  {
    #canvas;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#canvas = this.shadowRoot.querySelector('myCanvas');
    }

    connectedCallback() {
        
    }
}

window.customElements.define('my-canvas', CanvasView);