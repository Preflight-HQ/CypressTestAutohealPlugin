import loggerService from "../helpers/loggerService";

export default class CloseEmailCommand {
  private doc: Document;

  constructor(document: Document){
    this.doc = document;
  }

  public process() {
    this.doc.body.removeChild(this.doc.querySelector('preflight-main'))
    loggerService.log('closeEmail');
  }
}
