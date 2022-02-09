import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from "./baseRequestService";

class AuthService {
  private get authServerUrl() {
    return PreflightGlobalStore.authServerUrl;
  }
  public async getAccessToken(apiKey: string, force: boolean = false): Promise<string> {
    if(PreflightGlobalStore.ApiToken && !force) {
      return PreflightGlobalStore.ApiToken;
    }
    let rqService = new BaseRequestService(this.authServerUrl);
    let authData = {
      client_id: 'd1889a9c-a3bf-42b9-a4f6-dfd219ea2ede',
      client_secret: 'cbb7dff3-6708-4edc-8317-4aa54aca9c5f',
      grant_type: 'client_credentials',
      scope: 'tests_run'
    };
    let query = Object.keys(authData).map(k => `${k}=${authData[k]}`).join('&');
    let apiTokenResponseJson = await rqService.makeRequest('POST', '/connect/token', query, null, 'application/x-www-form-urlencoded', false);
    let apiTokenResponse = JSON.parse(apiTokenResponseJson);
    PreflightGlobalStore.ApiToken = apiTokenResponse.access_token;
    return PreflightGlobalStore.ApiToken;
  }
}

export default new AuthService();
