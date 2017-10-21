"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameOfLife_1 = require("./class/GameOfLife");
let gol = new GameOfLife_1.GameOfLife(10, 5, '.', 'X');
gol.charpix.data[0] = gol.charpix.fillChar;
gol.charpix.data[15] = gol.charpix.fillChar;
gol.charpix.data[16] = gol.charpix.fillChar;
gol.charpix.data[17] = gol.charpix.fillChar;
gol.charpix.data[24] = gol.charpix.fillChar;
gol.charpix.data[25] = gol.charpix.fillChar;
gol.charpix.data[26] = gol.charpix.fillChar;
//gol.charpix.print();
//gol.init(200, 1, 800);
gol.start();
//console.log(gol.charpix.getCoordinate(11));
//let f = new CharPixel(5, 5);
//f.drawLine(0,0, 0,4);
//f.print() 
