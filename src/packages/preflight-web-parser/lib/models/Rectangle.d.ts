import { Point } from "./Point";
export declare class Rectangle {
    constructor(x: number, y: number, width: number, height: number);
    topLeft: Point;
    width: number;
    height: number;
    get bottomRight(): Point;
    get center(): Point;
    get topX(): number;
    get topY(): number;
    get bottomX(): number;
    get bottomY(): number;
    get centerX(): number;
    get centerY(): number;
    isAbove(b: Rectangle): boolean;
    isLeft(b: Rectangle): boolean;
    isAlignedX(b: Rectangle): boolean;
    isAlignedY(b: Rectangle): boolean;
}
