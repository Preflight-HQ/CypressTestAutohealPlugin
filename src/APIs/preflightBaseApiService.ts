import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from "./baseRequestService";

class PreflightBaseApiService {
  private readonly requestService = new BaseRequestService(PreflightGlobalStore.apiUrl);

  public post(endpoint: string, data: any) : Promise<string> {
    return this.requestService.post(endpoint, data);
  }

  public get(endpoint: string) {
    return this.requestService.get(endpoint);
  }

  public getBlob(endpoint: string) {
    return this.requestService.getBlob(endpoint);
  }
}


export default new PreflightBaseApiService();
