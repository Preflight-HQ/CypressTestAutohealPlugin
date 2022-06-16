export default class GetElementCommandResult {
  public elementSimplePath: string | null = null;
  public selector: string | null = null;
  public element: Element;
  public isFoundByAutoheal: boolean = false;

  constructor(element: Element, selector){
    this.element = element;
    this.selector = selector;
  }
}
