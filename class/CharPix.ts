declare let process: any;
import * as os from 'os';

export class CharPixel{
    private _width: number;
    private _heigth: number;
    private _emptyPixel: string;
    private _fillChar: string;
    private _data: Array<string>;
    private leftPadding: number = 2;
    private TopPadding: number = 2;

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
        this._data =  Array<string>(this.width * this.heigth).fill(this.emptyPixel);
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
            if(CharPixel.isInLine(x, y, x1, y1, x2, y2))
            {
                this._data[index] = fill;
            }
        }
    }

    public static isInLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number): boolean{
        let left = (x2 - x1) * (y - y1);
        let right = (y2 - y1) * (x - x1);

        return left === right;
    }

    drawSquare(x1: number, y1: number, x2: number, y2: number, fillChar?: string ): void{
        let fill = fillChar || this.fillChar;

    }

    drawCircle(x1: number, y1: number, radius: number, fillChar?: string ): void{
        let fill = fillChar || this.fillChar;

        let sqdMax: number = radius * radius;
        for (let y = 0; y < this.heigth; y++)
        {
            for (let x = 0; x < this.width; x++)
            {
                let sqDist: number = (x - x1) * (x - x1) + (y - y1) * (y - y1);
                if (sqDist <= sqdMax){
                    let offset = this.getOffset(x, y);
                    this._data[offset] = fill;
                }
            }
        }
    }


    public getOffset(x: number, y: number): number{
        return y * this.width + x;
    }

    public getCoordinate(index: number): Array<number>{

        let x = Math.trunc(index % this.width);
        let y = Math.trunc(index / this.width);

        return [x, y];
    }

    private setIndex(x: number, y: number) {
        this._data[this.getOffset(x, y)] = this.fillChar;
    }


    print(): void{

        CharPixel.write(os.EOL);
        this.topDoPadding();
        this.leftDoPadding();

        for(let index = 0, cnt = 0; index < this.width * this.heigth; index++)
        {
            CharPixel.write(this._data[index]);
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

    private topDoPadding(): void{
        for(let i = 0; i < this.TopPadding; i++)
        {
            CharPixel.write(os.EOL);
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


    get data(): Array<string> {
        return this._data;
    }

    set data(value: Array<string>) {
        this._data = value;
    }
}