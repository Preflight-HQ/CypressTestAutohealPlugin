export default class BaseContext<T> {
    contextName: string;
    element: T;
    constructor(el: T, contextName: string);
}
