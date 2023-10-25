
export default class Line {
    constructor(color, width, timestamp) {
       
        this.color = color
        this.timestamp = timestamp
        this.width = width
        this.segments = {}
    }

    getHash() {
        return `H${this.timestamp}`
    }
}