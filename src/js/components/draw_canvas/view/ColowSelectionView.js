export default class ColorSelectionView {
    #canvasContext;
    #isMouseDown;
    #selectedColor;

    constructor(canvasContext, width, height) {
        this.width = width
        this.height = height
        const w = width
        const h = height
        this.#canvasContext = canvasContext;

        this.#selectedColor = this.#getColor(w,h)

        for (let x = 0; x < w; x+= 10) {
            for (let y = 0; y < h; y++) {
                this.#canvasContext.fillStyle = this.#getColor(x, y);
                this.#canvasContext.fillRect(x, y, 10, 1);
            }
        }
    }

    #getColor(x, y) {
        const numBlues = 8.0
        const widthOfBlue = this.width / numBlues
        const redPartOfX = (x % widthOfBlue)
        const bluePartOfX = parseInt(x / widthOfBlue)
        const bluePerPart = 255/numBlues

        let r = parseInt(255.0*redPartOfX/widthOfBlue);
        let g = parseInt(255.0 * y /this.height);
        let b = parseInt(bluePerPart* bluePartOfX)


        if (r > 255)
            r = 255
        if (g > 255)
            g = 255
        if (b > 255)
            b = 255
        return "rgb("+ r +", " + g + ", " + b + ")";
    }


    mouseUp(x, y) {
        this.#isMouseDown = false

        this.#selectedColor = this.#getColor(x, y)

        this.#canvasContext.fillStyle = this.#getColor(x, y);
        this.#canvasContext.fillRect(0, 0, 10, 10);

        console.log("Selected  at", x, this.#selectedColor)
    }

    getActiveColor() {
        return this.#canvasContext.fillStyle
    }

}