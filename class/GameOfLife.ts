import {CharPixel} from "./CharPix";

declare let process: any;
import * as os from 'os';
import * as fs from 'fs';

export class GameOfLife{
    public charpix: CharPixel;
    private calculDelay: number = 0;
    private first: boolean = false;
    private neighborsCountForBirth: number =  3;
    private neighborsCountForStayingSame: number =  2;

    constructor(width: number, height: number, die: string = '.', alive: string = '*') {
        this.charpix = new CharPixel(width, height, die, alive);

    }

    init(maxInitalAlive: number = 10, maxFillStep: number = 3, calculDelay: number = 800, initFirst: boolean = true): void{
        this.calculDelay = calculDelay || this.calculDelay;
        if(initFirst){
            this.firstGeneration(maxInitalAlive, maxFillStep);
        }

        this.start();
    }

    initFromLoad(calculDelay: number = 800): void{
        this.calculDelay = calculDelay || this.calculDelay;
        this.start();
    }

    start(maxGeneration? :number):void{


        let max: number = maxGeneration ? Math.abs(maxGeneration) : Number.POSITIVE_INFINITY;
        this.nextGeneration(this.calculDelay, 1, max);
    }


    firstGeneration(maxInitalAlive: number = 10, maxFillStep: number = 3): void{
        let cnt = 0;

        for(let i = 0; i < this.charpix.width * this.charpix.heigth;){
            let fill = 1 === GameOfLife.randomWithProbability();
            if(cnt < maxInitalAlive && fill){
                this.charpix.data[i] = this.charpix.fillChar;
                cnt++;
            }

            i += GameOfLife.getRandomArbitrary(1, maxFillStep);
        }

        this.first = true;

    }

    nextGeneration(delay: number, currentGen: number, maxGen: number): void{

        GameOfLife.clearScreen();
        this.charpix.print();
        console.log('Génération : ', currentGen)
        let tmp =  Array<string>(this.charpix.width * this.charpix.heigth).fill(this.charpix.emptyPixel);

        for(let cnt = 0; cnt < this.charpix.width * this.charpix.heigth; cnt++){
            let [x, y] = this.charpix.getCoordinate(cnt);
            let neighborsCount = this.neighborsCount(x, y, cnt);

            let isCellAlive = this.charpix.data[this.charpix.getOffset(x, y)] === this.charpix.fillChar;
            if(neighborsCount === this.neighborsCountForBirth || (neighborsCount === this.neighborsCountForStayingSame && isCellAlive)){
                tmp[cnt] = this.charpix.fillChar;
            }
        }

        this.charpix.data = tmp;



        if(++currentGen < maxGen){
            setTimeout(() => {
                this.nextGeneration(delay, currentGen, maxGen);
            }, this.calculDelay);
        }
    }

    neighborsCount(x: number, y: number, index: number): number{
        //console.log([x, y, index])

        let isCellAlive = (x1: number, y1: number): number => {
            return this.charpix.data[this.charpix.getOffset(x1, y1)] === this.charpix.fillChar ? 1 : 0
        };

        let aliveCells: number = isCellAlive(x-1, y-1) + isCellAlive(x, y-1) + isCellAlive(x+1, y-1)
            + isCellAlive(x-1, y) + isCellAlive(x+1, y) + isCellAlive(x-1, y + 1) + isCellAlive(x, y + 1) + isCellAlive(x+1, y+1);

        //console.log(x, y, aliveCells);

        //console.log([x, y, index], aliveCells)

        //console.log([x, y, aliveCells], [index, isCellAlive(x, y), this.charpix.data[index], this.charpix.data[this.charpix.getOffset(x, y)], isCellAlive(x+1, y), isCellAlive(x, y+1)]);



        return aliveCells;//GameOfLife.getRandomArbitrary(1, 5);
    }

    private static clearScreen(): void{
        process.stdout.write('\x1Bc');
    }

     static getRandomArbitrary(min: number, max: number): number {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

     static randomWithProbability(): number {
        let notRandomNumbers = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4];
        let idx = Math.floor(Math.random() * notRandomNumbers.length);
        return notRandomNumbers[idx];
    }

    print(): void{
        this.charpix.print();
    }


    public static fromFile(path: string, die: string = ' ', alive: string = 'X'): GameOfLife{
        let data: string = fs.readFileSync(path).toString() || '';

        let width = 0;
        let height = 1;

        let plat: Array<string> =  data.split('').filter((value: string) => {

            if(value === os.EOL){
                height++;
            }
            else{
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