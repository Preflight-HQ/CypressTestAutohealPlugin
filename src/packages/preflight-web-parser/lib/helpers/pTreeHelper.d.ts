import { Primitive } from "../models/primitive";
declare class PrimitiveTreeHelper {
    findInTree(root: Primitive, searchFn: (e: Primitive, depth: number) => boolean, maxDepth?: number, skipInvisibleWrappers?: boolean, stopTraverseFn?: (e: Primitive, depth: number) => boolean, depth?: number): Primitive[];
    foreachNode(root: Primitive, fn: (e: Primitive) => boolean, maxDepth?: number, depth?: number): void;
    findParents(root: Primitive | null, fn: (e: Primitive) => boolean, maxDistance?: number, distance?: number): Primitive[];
    findPreceding(root: Primitive | null, fn: (e: Primitive) => boolean, maxDistance?: number, maxResults?: number): Primitive[];
}
declare const pTreeHelper: PrimitiveTreeHelper;
export { pTreeHelper };
