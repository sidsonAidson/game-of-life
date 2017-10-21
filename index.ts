import {CharPixel} from './class/CharPix';
import {GameOfLife} from "./class/GameOfLife";


//let gol = GameOfLife.fromFile(__dirname + '/plateau/grenouille.gol', '.', 'X');

//gol.initFromLoad(800);


let gol = new GameOfLife(50, 50);
gol.init(200, 6);

//console.log(gol.charpix.getCoordinate(11));


//let f = new CharPixel(5, 5);
//f.drawLine(0,0, 0,4);
//f.print()