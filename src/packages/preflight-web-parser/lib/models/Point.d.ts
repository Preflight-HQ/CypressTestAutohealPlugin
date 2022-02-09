export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    distance(point: Point): number;
    isAbove(point: Point): boolean;
    isLeft(point: Point): boolean;
}
