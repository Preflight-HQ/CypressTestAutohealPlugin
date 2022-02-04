import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from '../APIs/baseRequestService';
import EmailPreview from "../models/EmialPreview";
import EmailDetail from "../models/EmialDetail";

class EmailApiService extends BaseRequestService {
  constructor() {
    super(PreflightGlobalStore.apiUrl + 'ExternalTestDriver/Emails/');
    this.authHeaders = {
      'base64AuthKey': () => PreflightGlobalStore.autohealApiToken
    }
  }

  public async getEmails(email: string): Promise<EmailPreview[]> {
    let response = await this.get('List/' + email);
    return JSON.parse(response) as EmailPreview[];

  }

  public async getEmail(emailGuid: string): Promise<EmailDetail> {
    let contentHtml = await this.get(emailGuid);
    let result = new EmailDetail();
    result.contentHtml = contentHtml;
    result.guid = emailGuid;
    return result;

  }
}


export default new EmailApiService();
