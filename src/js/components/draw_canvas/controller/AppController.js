

export default class AppController {
    #model;

    constructor(model) 
    {
        this.#model = model
        console.log("Hello world")
    }

    drawLine(line) {
        this.#model.addLine(line)
    }

    getModel() {
        return this.#model
    }
}