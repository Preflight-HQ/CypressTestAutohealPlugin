import { ContextType } from "../../types/enums/ContextType";
export declare class ParsedElContext {
    weight: number;
    value: string;
    type: ContextType;
    static readonly maxValueLength: number;
    constructor(value: string | null | undefined, weight?: number, type?: ContextType);
    private getTruncatedValue;
}
