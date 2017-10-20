import {MathUtils} from "./MathUtils";

declare let process: any;
import * as os from 'os';

export class CharPixel{
    private _width: number;
    private _heigth: number;
    private _emptyPixel: string;
    private _fillChar: string;
    private data: Array<string>;
    private leftPadding: number = 0;




    /**
     *
     * @param {number} width
     * @param {number} heigth
     * @param {string} emptyPixel
     * @param {string} fillChar
     */
    constructor(width: number, heigth: number, emptyPixel: string = '.', fillChar: string = '*') {
        this._width = width;
        this._heigth = heigth;
        this._emptyPixel = emptyPixel;
        this.fillChar = fillChar;

        this.data =  Array<string>(this.width * this.heigth).fill(this.emptyPixel);
    }

    /**
     *
     * @param {number} x1
     * @param {number} y1
     * @param x2
     * @param y2
     * @param fillChar
     */
    drawLine(x1: number, y1: number, x2: number, y2: number, fillChar?: string ): void{
        let fill = fillChar || this.fillChar;
        for(let index = 0; index < this.width * this.heigth; index++){
            let [x, y] = this.getCoordinate(index);
            if(MathUtils.isInLine(x, y, x1, y1, x2, y2))
            {
                this.data[index] = fill;
            }
        }
    }

    drawSquare(x1: number, y1: number, x2: number, y2: number, fillChar?: string ){
        let fill = fillChar || this.fillChar;


    }


    private getOffset(x: number, y: number): number{
        return y * this.width + x;
    }

    private getCoordinate(index: number): Array<number>{
        let coordinates : Array<number> =  [];

        let y = Math.trunc(index / this.width);
        let x = Math.trunc(index % this.heigth);

        coordinates.push(x, y);

        return coordinates;
    }

    private setIndex(x: number, y: number) {
        this.data[this.getOffset(x, y)] = this.fillChar;
    }


    print(): void{

        CharPixel.write(os.EOL);
        this.leftDoPadding();

        for(let index = 0, cnt = 0; index < this.width * this.heigth; index++)
        {
            CharPixel.write(this.data[index]);
            CharPixel.write(' ');

            if(++cnt === this.width)
            {
                CharPixel.write(os.EOL);
                this.leftDoPadding();

                cnt = 0;
            }
        }

        CharPixel.write(os.EOL);
        
    }

    private leftDoPadding(): void{
        for(let i = 0; i < this.leftPadding; i++)
        {
            CharPixel.write(' ');
        }
    }


    static write(str: string): void{
        process.stdout.write(str);
    }


    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get heigth(): number {
        return this._heigth;
    }

    set heigth(value: number) {
        this._heigth = value;
    }

    get emptyPixel(): string {
        return this._emptyPixel;
    }

    set emptyPixel(value: string) {
        this._emptyPixel = value;
    }

    get fillChar(): string {
        return this._fillChar;
    }

    set fillChar(value: string) {
        this._fillChar = value;
    }
}