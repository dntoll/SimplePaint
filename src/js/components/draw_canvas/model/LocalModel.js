

export default class LocalModel {

    #storagePosition = "Paint::Lines"
    #lines = {}

    constructor() {
        let lines = localStorage.getItem(this.#storagePosition)
        if (lines === null)
            this.#lines = {}
        else
            this.#lines = JSON.parse(lines)
    }

    getLines() {
        return this.#lines
    }

    addLine(line) {
        this.#lines[line.getHash()] =line
        const strData = JSON.stringify(this.#lines)
        localStorage.setItem(this.#storagePosition, strData)
    }
}