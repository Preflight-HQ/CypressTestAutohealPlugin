import { ContextType } from "../../types/enums/ContextType";
import { ParsedElContext } from "./ParsedElContext";
export declare class ParsedElKeyValueContext extends ParsedElContext {
    key: string;
    constructor(key: string, value: string | null | undefined, weight?: number, type?: ContextType);
}
