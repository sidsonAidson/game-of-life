import {CharPixel} from './class/CharPix';


let c: CharPixel = new CharPixel(50, 50);


c.drawLine(0, 0, 49, 49);
c.drawLine(0, 49, 49, 0);

c.print();


//c.drawLine(0, 0, 48, 49);


//c.print();