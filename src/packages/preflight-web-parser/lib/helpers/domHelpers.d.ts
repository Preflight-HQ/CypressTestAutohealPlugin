import { Primitive } from "../models/primitive";
import { CollectionElement } from "../types";
export declare const getElementSize: (el: HTMLElement, key: Exclude<keyof DOMRect, "toJSON">) => number;
export declare const getTagName: (el: HTMLElement) => string;
export declare const getElementsInArea: ({ x, y, width }: {
    x: number;
    y: number;
    width: number;
}) => Element[];
export declare const getClosestElement: (el: HTMLElement, collection: CollectionElement[]) => CollectionElement;
export declare const positive: (value: number) => number;
export declare const getElementWidthAndHeight: (el: HTMLElement) => {
    width: number;
    height: number;
};
export declare const getElementSizeModel: (el: HTMLElement) => {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
    x: number;
    y: number;
};
export declare const getTextNodes: (element: Element) => (Element | ChildNode)[];
export declare const getPossibleTitles: (element: Element, limit: number) => {
    element: HTMLElement | null;
    fontSize: number;
    text: string | null;
}[];
export declare function getComputedStyleProperty(el: Element, property: string): string;
export declare function getComputedStyleNumericProperty(el: Element, property: string): number;
export declare const isElementHidden: (el: HTMLElement | Primitive) => boolean;
export declare const getChildren: (el: HTMLElement) => HTMLCollection | never[];
export declare const getNextSiblings: (el: HTMLElement) => ChildNode[];
export declare const getPrevSiblings: (el: HTMLElement) => ChildNode[];
export declare const setBorder: (element: Primitive, color?: string, text?: string) => void;
export declare const setColor: (element: Primitive) => void;
export declare const getPseudoStyle: (element: Primitive, type: '::before' | '::after') => CSSStyleDeclaration;
export declare const isIconFont: (fontFamily: string) => boolean;
export declare const newGuid: () => string;
export declare const newGlobalGuid: () => string;
export declare const guidReset: () => number;
export declare function getBodyFontSize(): number;
