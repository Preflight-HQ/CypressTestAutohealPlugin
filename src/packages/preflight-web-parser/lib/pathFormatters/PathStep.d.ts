import { ElementType } from "../types/enums/ElementType";
export default class PathStep {
    type: string;
    content: string | undefined | null;
    constructor(type: string | ElementType, content: string | undefined | null);
}
