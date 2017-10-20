"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MathUtils {
    static isInLine(x, y, x1, y1, x2, y2) {
        let left = (x2 - x1) * (y - y1);
        let right = (y2 - y1) * (x - x1);
        return left === right;
    }
}
exports.MathUtils = MathUtils;
