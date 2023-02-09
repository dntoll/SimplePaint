

export default class LocalModel {

    #storagePosition = "Paint::Lines"
    #lines = []

    constructor() {
        let lines = localStorage.getItem(this.#storagePosition)
        if (lines === null)
            lines = []
        else
            this.#lines= JSON.parse(lines)
    }

    getLines() {
        return this.#lines
    }

    addLine(line) {

        
        this.#lines.push(line)
        localStorage.setItem(this.#storagePosition, JSON.stringify(this.#lines))
    }
}