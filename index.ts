import {CharPixel} from './class/CharPix';
import {GameOfLife} from "./class/GameOfLife";


let gol = new GameOfLife(10, 5, '.', 'X');
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