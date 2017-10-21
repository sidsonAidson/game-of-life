"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
class CharPixel {
    /**
     *
     * @param {number} width
     * @param {number} heigth
     * @param {string} emptyPixel
     * @param {string} fillChar
     */
    constructor(width, heigth, emptyPixel = '.', fillChar = '*') {
        this.leftPadding = 50;
        this.TopPadding = 5;
        this._width = width;
        this._heigth = heigth;
        this._emptyPixel = emptyPixel;
        this.fillChar = fillChar;
        this._data = Array(this.width * this.heigth).fill(this.emptyPixel);
    }
    /**
     *
     * @param {number} x1
     * @param {number} y1
     * @param x2
     * @param y2
     * @param fillChar
     */
    drawLine(x1, y1, x2, y2, fillChar) {
        let fill = fillChar || this.fillChar;
        for (let index = 0; index < this.width * this.heigth; index++) {
            let [x, y] = this.getCoordinate(index);
            if (CharPixel.isInLine(x, y, x1, y1, x2, y2)) {
                this._data[index] = fill;
            }
        }
    }
    static isInLine(x, y, x1, y1, x2, y2) {
        let left = (x2 - x1) * (y - y1);
        let right = (y2 - y1) * (x - x1);
        return left === right;
    }
    drawSquare(x1, y1, x2, y2, fillChar) {
        let fill = fillChar || this.fillChar;
    }
    drawCircle(x1, y1, radius, fillChar) {
        let fill = fillChar || this.fillChar;
        let sqdMax = radius * radius;
        for (let y = 0; y < this.heigth; y++) {
            for (let x = 0; x < this.width; x++) {
                let sqDist = (x - x1) * (x - x1) + (y - y1) * (y - y1);
                if (sqDist <= sqdMax) {
                    let offset = this.getOffset(x, y);
                    this._data[offset] = fill;
                }
            }
        }
    }
    getOffset(x, y) {
        return y * this.width + x;
    }
    getCoordinate(index) {
        let x = Math.trunc(index % this.width);
        let y = Math.trunc(index / this.width);
        return [x, y];
    }
    setIndex(x, y) {
        this._data[this.getOffset(x, y)] = this.fillChar;
    }
    print() {
        CharPixel.write(os.EOL);
        this.topDoPadding();
        this.leftDoPadding();
        for (let index = 0, cnt = 0; index < this.width * this.heigth; index++) {
            CharPixel.write(this._data[index]);
            CharPixel.write(' ');
            if (++cnt === this.width) {
                CharPixel.write(os.EOL);
                this.leftDoPadding();
                cnt = 0;
            }
        }
        CharPixel.write(os.EOL);
    }
    leftDoPadding() {
        for (let i = 0; i < this.leftPadding; i++) {
            CharPixel.write(' ');
        }
    }
    topDoPadding() {
        for (let i = 0; i < this.TopPadding; i++) {
            CharPixel.write(os.EOL);
        }
    }
    static write(str) {
        process.stdout.write(str);
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get heigth() {
        return this._heigth;
    }
    set heigth(value) {
        this._heigth = value;
    }
    get emptyPixel() {
        return this._emptyPixel;
    }
    set emptyPixel(value) {
        this._emptyPixel = value;
    }
    get fillChar() {
        return this._fillChar;
    }
    set fillChar(value) {
        this._fillChar = value;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
}
exports.CharPixel = CharPixel;
