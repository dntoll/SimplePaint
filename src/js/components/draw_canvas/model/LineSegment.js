
export default class LineSegment {
    constructor(x, y, toX, toY, timestamp) {
        this.x = x
        this.y = y
        this.toY = toY
        this.toX = toX
        this.timestamp = timestamp
    }

    getHash() {
        return `H${this.timestamp}`
    }
}