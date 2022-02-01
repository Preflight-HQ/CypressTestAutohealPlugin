import emailApiService from '../APIs/emailApiService';
import {sleepAsync} from "../helpers/globalHelpers";
import EmailPreview from "../models/EmialPreview";
import loggerService from "../helpers/loggerService";
import variablesProcessor from "../helpers/variablesProcessor";
export default class OpenEmailCommand {
  private doc: Document;
  private readonly email: string;

  constructor(document: Document){
    this.doc = document;
    this.email = variablesProcessor.generatedEmail;
  }

  public async process(subject: string, timeout: number = 30000) {
    let endTime = Date.now() + timeout;
    let foundEmail: EmailPreview | null = null;
    while(endTime > Date.now()) {
      let emails = await emailApiService.getEmails(this.email);
      foundEmail = this.findEmailBySubject(emails, subject);
      if(foundEmail){
        break;
      }
      await sleepAsync(timeout/6);
    }

    if(!foundEmail) {
      throw new Error(`Email with subject "${subject}" was not found in timeout.`);
    }

    let emailDetail = await emailApiService.getEmail(foundEmail.guid);
    this.openEmailInIframe(emailDetail.contentHtml);
    loggerService.log('openEmail', `Open email with subject "${subject}"`);
  }

  private findEmailBySubject(emails: EmailPreview[], subject: string): EmailPreview{
    return emails.find(e => e.subject == subject);
  }

  private openEmailInIframe(emailContentHtml: string) {
    let html = emailContentHtml

    // Prepare html to be put in js variable
    html = html.replace("\'", "\\\'");
    html = html.replace( "\n|\t", " ");
    html = html.replace( "[\n\r]+\s*", '');
    html = html.replace( "\s{2,}", " ");

    let styleElement = this.doc.createElement('style');
    styleElement.innerHTML = '.email-overlay{display: flex; flex-direction: column; align-items: flex-end; position: fixed; right: 100px; top: 20px; width: 90vw; max-height: 90vh; height: 100%; padding: 10px; background: #fff; border-radius: 5px; box-shadow: 1px 30px 30px -28px rgba(27, 23, 59, 0.2), 0px 9px 34px rgba(27, 23, 59, 0.22);z-index:2147483647}.email-overlay iframe{border: 0; width: 100%; height: 100%;}';
    this.doc.getElementsByTagName('head')[0].appendChild(styleElement);

    function processedEmailContent(content) {
      return content.replace(/<a/g, '<a target="_parent"');
    }
    function srcDoc(iframe, content) {
      content = processedEmailContent(content);
      if ('srcdoc' in iframe) {
        iframe.setAttribute('srcdoc', content);
      } else {
        iframe.setAttribute("src", "javascript: '" + content + "'");
      }
    }

    let preflightMain = this.doc.createElement('preflight-main');
    let preflightEmail = this.doc.createElement('preflight-email');
    let emailIframe = this.doc.createElement('iframe');
    emailIframe.id = 'pf-email-iframe';
    srcDoc(emailIframe, emailContentHtml);
    preflightEmail.classList.add('email-overlay');

    preflightMain.appendChild(preflightEmail);
    preflightEmail.appendChild(emailIframe);

    this.doc.body.appendChild(preflightMain);
  }
}
