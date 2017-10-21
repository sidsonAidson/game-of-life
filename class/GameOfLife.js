"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CharPix_1 = require("./CharPix");
const os = require("os");
const fs = require("fs");
class GameOfLife {
    constructor(width, height, die = '.', alive = '*') {
        this.calculDelay = 0;
        this.first = false;
        this.neighborsCountForBirth = 3;
        this.neighborsCountForStayingSame = 2;
        this.charpix = new CharPix_1.CharPixel(width, height, die, alive);
    }
    init(maxInitalAlive = 10, maxFillStep = 3, calculDelay = 800, initFirst = true) {
        this.calculDelay = calculDelay || this.calculDelay;
        if (initFirst) {
            this.firstGeneration(maxInitalAlive, maxFillStep);
        }
        this.start();
    }
    initFromLoad(calculDelay = 800) {
        this.calculDelay = calculDelay || this.calculDelay;
        this.start();
    }
    start(maxGeneration) {
        this.print();
        let max = maxGeneration ? Math.abs(maxGeneration) : Number.POSITIVE_INFINITY;
        setTimeout(() => {
            this.nextGeneration(this.calculDelay, 0, max);
        }, this.calculDelay);
    }
    firstGeneration(maxInitalAlive = 10, maxFillStep = 3) {
        let cnt = 0;
        for (let i = 0; i < this.charpix.width * this.charpix.heigth;) {
            let fill = 1 === GameOfLife.randomWithProbability();
            if (cnt < maxInitalAlive && fill) {
                this.charpix.data[i] = this.charpix.fillChar;
                cnt++;
            }
            i += GameOfLife.getRandomArbitrary(1, maxFillStep);
        }
        this.first = true;
    }
    nextGeneration(delay, currentGen, maxGen) {
        GameOfLife.clearScreen();
        let tmp = Array(this.charpix.width * this.charpix.heigth).fill(this.charpix.emptyPixel);
        for (let cnt = 0; cnt < this.charpix.width * this.charpix.heigth; cnt++) {
            let [x, y] = this.charpix.getCoordinate(cnt);
            let neighborsCount = this.neighborsCount(x, y, cnt);
            let isCellAlive = this.charpix.data[this.charpix.getOffset(x, y)] === this.charpix.fillChar;
            if (neighborsCount === this.neighborsCountForBirth || (neighborsCount === this.neighborsCountForStayingSame && isCellAlive)) {
                tmp[cnt] = this.charpix.fillChar;
            }
        }
        this.charpix.data = tmp;
        this.charpix.print();
        if (++currentGen < maxGen) {
            setTimeout(() => {
                this.nextGeneration(delay, currentGen, maxGen);
            }, this.calculDelay);
        }
    }
    neighborsCount(x, y, index) {
        //console.log([x, y, index])
        let isCellAlive = (x1, y1) => {
            return this.charpix.data[this.charpix.getOffset(x1, y1)] === this.charpix.fillChar ? 1 : 0;
        };
        let aliveCells = isCellAlive(x - 1, y - 1) + isCellAlive(x, y - 1) + isCellAlive(x + 1, y - 1)
            + isCellAlive(x - 1, y) + isCellAlive(x + 1, y) + isCellAlive(x - 1, y + 1) + isCellAlive(x, y + 1) + isCellAlive(x + 1, y + 1);
        //console.log(x, y, aliveCells);
        //console.log([x, y, index], aliveCells)
        //console.log([x, y, aliveCells], [index, isCellAlive(x, y), this.charpix.data[index], this.charpix.data[this.charpix.getOffset(x, y)], isCellAlive(x+1, y), isCellAlive(x, y+1)]);
        return aliveCells; //GameOfLife.getRandomArbitrary(1, 5);
    }
    static clearScreen() {
        process.stdout.write('\x1Bc');
    }
    static getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }
    static randomWithProbability() {
        let notRandomNumbers = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4];
        let idx = Math.floor(Math.random() * notRandomNumbers.length);
        return notRandomNumbers[idx];
    }
    print() {
        this.charpix.print();
    }
    static fromFile(path, die = ' ', alive = 'X') {
        let data = fs.readFileSync(path).toString() || '';
        let width = 0;
        let height = 1;
        let plat = data.split('').filter((value) => {
            if (value === os.EOL) {
                height++;
            }
            else {
                width++;
            }
            return value !== os.EOL;
        });
        width = width / height;
        let gof = new GameOfLife(width, height, die, alive);
        gof.charpix.data = plat;
        return gof;
    }
}
exports.GameOfLife = GameOfLife;
