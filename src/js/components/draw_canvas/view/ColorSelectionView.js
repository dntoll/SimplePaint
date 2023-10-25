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

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                this.#canvasContext.fillStyle = this.#getColor(x, y);
                this.#canvasContext.fillRect(x, y, 10, 1);
            }
        }
    }

    #getColor(x, y) {
        const midx = this.width/2
        const midy = this.height/2
        const xdiff = (midx - x)/midx
        const ydiff = (midy - y)/midy

        const diagonal = Math.sqrt(xdiff*xdiff + ydiff * ydiff);
        const distance = 100 - parseInt(100.0 * diagonal)

        let saturation = 100
        let lightness = 100
        if (distance > 200) {
            saturation = distance - 200
            lightness = 50
        } else if (distance > 100) {
            saturation = distance - 100
            lightness = 100
        } else {
            lightness = distance
        }

        

        const degree = parseInt(Math.atan2(ydiff, xdiff) * 57.296)
        
        return "hsl("+ degree +", "+saturation+"%, "+lightness + "%)";
    }


    mouseUp(x, y) {
        this.#isMouseDown = false

        this.#selectedColor = this.#getColor(x, y)

        this.#canvasContext.fillStyle = this.#selectedColor
        this.#canvasContext.fillRect(0, 0, 30, 30);

        console.log("Selected  at", x, this.#selectedColor)
    }

    getActiveColor() {
        return this.#canvasContext.fillStyle
    }

}