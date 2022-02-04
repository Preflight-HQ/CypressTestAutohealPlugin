import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from '../APIs/baseRequestService';
import EmailPreview from "../models/EmialPreview";
import EmailDetail from "../models/EmialDetail";

class FakerApiService extends BaseRequestService {
  constructor() {
    super(PreflightGlobalStore.apiUrl + 'ExternalTestDriver/Variables/');
    this.authHeaders = {
      'base64AuthKey': () => PreflightGlobalStore.autohealApiToken
    }
  }

  public async getFakeData(variable: string): Promise<string> {
    let response = await this.get('', { variable });
    return response;

  }
}

export default new FakerApiService();
