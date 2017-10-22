"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameOfLife_1 = require("./class/GameOfLife");
//let gol = GameOfLife.fromFile(__dirname + '/plateau/grenouille.gol', '.', 'X');
//gol.initFromLoad(800);
let gol = new GameOfLife_1.GameOfLife(30, 30, '🌑', '🌝'); // test 1
//let gol = new GameOfLife(50, 50, '.', '@'); //test 2
gol.init(300, 10, 100);
//console.log(gol.charpix.getCoordinate(11));
//let f = new CharPixel(5, 5);
//f.drawLine(0,0, 0,4);
//f.print() 
