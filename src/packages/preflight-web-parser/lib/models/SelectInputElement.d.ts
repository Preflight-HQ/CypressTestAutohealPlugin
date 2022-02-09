import { ParsedElement } from "./ParsedElement";
import { Primitive } from "./primitive";
import { ParsedElContext } from "./parsedData/ParsedElContext";
import KeyValue from "./KeyValue";
export declare class SelectInputElement extends ParsedElement {
    label: string | null;
    options: KeyValue<string, string>[];
    constructor(node: Primitive, confidence?: number);
    addOption(key: string, value: string): void;
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
