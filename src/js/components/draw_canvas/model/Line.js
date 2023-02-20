
export default class Line {
    constructor(x, y, toX, toY, color, timestamp) {
        this.x = x
        this.y = y
        this.toY = toY
        this.toX = toX
        this.color = color
        this.timestamp = timestamp
    }

    getHash() {
        return `H${this.timestamp}`
    }
}