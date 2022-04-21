export default class PseudoSelector {
    path: string[];
    constructor(pseudoSelectorString: string);
    get targetGuid(): string;
    toString(): string;
}
