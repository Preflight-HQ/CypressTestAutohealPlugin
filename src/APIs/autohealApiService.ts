import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from '../APIs/baseRequestService';
import EmailPreview from "../models/EmialPreview";
import EmailDetail from "../models/EmialDetail";

class AutohealApiService extends BaseRequestService {
  constructor() {
    super(PreflightGlobalStore.apiUrl + 'ExternalTestDriver/AutohealTestData/');
  }

  public async getData(testId: string, testName:any): Promise<any> {
    let response = await this.post(testId, {testName});
    if(!response){
      return null;
    }
    return JSON.parse(response);

  }
}


export default new AutohealApiService();
