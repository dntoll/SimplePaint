import Line from '../model/Line.js'
import LineSegment from '../model/LineSegment.js'

export default class LocalModel {

    #storagePosition = "Paint::Lines"
    #lines = {}
    #currentLine = new Line()

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

    newLine(line) {
        this.#currentLine = line
        this.#lines[line.getHash()] = line
    }

    addLineSegment(segment) {
        this.#lines[this.#currentLine.getHash()] = this.#currentLine
        this.#currentLine.segments[segment.getHash()] = segment
        const strData = JSON.stringify(this.#lines)
        localStorage.setItem(this.#storagePosition, strData)
    }


    removeLastLine() {
        let keys = Object.keys(this.#lines)
        delete this.#lines[keys[keys.length-1]]

        this.#currentLine = new Line();
        const strData = JSON.stringify(this.#lines)
        localStorage.setItem(this.#storagePosition, strData)

    }
}