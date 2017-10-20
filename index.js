"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CharPix_1 = require("./class/CharPix");
let c = new CharPix_1.CharPixel(50, 50);
c.drawLine(0, 0, 49, 49);
c.drawLine(0, 49, 49, 0);
c.print();
//c.drawLine(0, 0, 48, 49);
//c.print(); 
