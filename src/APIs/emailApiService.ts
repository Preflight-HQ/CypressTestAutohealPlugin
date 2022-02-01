import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from '../APIs/baseRequestService';
import EmailPreview from "../models/EmialPreview";
import EmailDetail from "../models/EmialDetail";

class EmailApiService {
  private readonly emailApiUrl: string = PreflightGlobalStore.emailApiBaseUrl + 'Emails/';
  private readonly emailApiService = new BaseRequestService(this.emailApiUrl);

  public async getEmails(email: string): Promise<EmailPreview[]> {
    let response = await this.emailApiService.get('List/' + email);
    return JSON.parse(response) as EmailPreview[];

  }

  public async getEmail(emailGuid: string): Promise<EmailDetail> {
    let contentHtml = await this.emailApiService.get(emailGuid);
    let result = new EmailDetail();
    result.contentHtml = contentHtml;
    result.guid = emailGuid;
    return result;

  }
}


export default new EmailApiService();
