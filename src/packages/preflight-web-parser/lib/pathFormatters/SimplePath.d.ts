import PathStep from "./PathStep";
export default class SimplePath {
    top: PathStep | null;
    wrapper: PathStep | null;
    target: PathStep | null;
    constructor(top: PathStep | null, wrapper: PathStep | null, target: PathStep | null);
}
