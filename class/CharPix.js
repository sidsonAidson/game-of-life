"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = require("./MathUtils");
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
        this.leftPadding = 0;
        this._width = width;
        this._heigth = heigth;
        this._emptyPixel = emptyPixel;
        this.fillChar = fillChar;
        this.data = Array(this.width * this.heigth).fill(this.emptyPixel);
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
            if (MathUtils_1.MathUtils.isInLine(x, y, x1, y1, x2, y2)) {
                this.data[index] = fill;
            }
        }
    }
    drawSquare(x1, y1, x2, y2, fillChar) {
        let fill = fillChar || this.fillChar;
    }
    getOffset(x, y) {
        return y * this.width + x;
    }
    getCoordinate(index) {
        let coordinates = [];
        let y = Math.trunc(index / this.width);
        let x = Math.trunc(index % this.heigth);
        coordinates.push(x, y);
        return coordinates;
    }
    setIndex(x, y) {
        this.data[this.getOffset(x, y)] = this.fillChar;
    }
    print() {
        CharPixel.write(os.EOL);
        this.leftDoPadding();
        for (let index = 0, cnt = 0; index < this.width * this.heigth; index++) {
            CharPixel.write(this.data[index]);
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
}
exports.CharPixel = CharPixel;
