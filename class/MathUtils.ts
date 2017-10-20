export class MathUtils{

    public static isInLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number): boolean{
        let left = (x2 - x1) * (y - y1);
        let right = (y2 - y1) * (x - x1);

        return left === right;
    }

}