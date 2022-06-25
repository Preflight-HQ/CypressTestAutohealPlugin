import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from '../APIs/baseRequestService';
import EmailPreview from "../models/EmialPreview";
import EmailDetail from "../models/EmialDetail";

class AutohealApiService extends BaseRequestService {
  constructor() {
    super(PreflightGlobalStore.apiUrl + 'ExternalTestDriver/');
  }

  public async getTestAutohealData(testId: string, testName:any): Promise<any> {
    let response = await this.get('TestAutohealData/' +testId, {testName});
    if(!response){
      return null;
    }
    return JSON.parse(response);
  }

  public async getPomAutohealData(pomElementId: string, testName:any): Promise<any> {
    let response = await this.get('PomAutohealData/'+pomElementId, {testName});
    if(!response){
      return null;
    }
    return JSON.parse(response);
  }
}


export default new AutohealApiService();
