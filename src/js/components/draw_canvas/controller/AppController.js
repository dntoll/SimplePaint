

export default class AppController {
    #model;

    constructor(model) 
    {
        this.#model = model
    }

    newLine(line) {
        this.#model.newLine(line)
    }

    addLineSegment(segment) {
        this.#model.addLineSegment(segment)
    }

    undo() {
        this.#model.removeLastLine();
    }

    getModel() {
        return this.#model
    }
}