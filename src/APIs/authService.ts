import PreflightGlobalStore from "../PreflightGlobalStore";
import BaseRequestService from "./baseRequestService";
import {base64ToString} from "../helpers/globalHelpers";

class AuthService {
  private get authServerUrl() {
    return PreflightGlobalStore.authServerUrl;
  }
  public async getAccessToken(apiKey: string, force: boolean = false): Promise<string> {
    try {
      if (PreflightGlobalStore.ApiToken && !force) {
        return PreflightGlobalStore.ApiToken;
      }
      let rqService = new BaseRequestService(this.authServerUrl);
      let clientDetails = this.apiKeyToClientDetails(apiKey);
      let authData = {
        client_id: clientDetails.clientId,
        client_secret: clientDetails.clientSecret,
        grant_type: 'client_credentials',
        scope: 'tests_run'
      };
      let query = Object.keys(authData).map(k => `${k}=${authData[k]}`).join('&');
      let apiTokenResponseJson = await rqService.makeRequest('POST', '/connect/token', query, null, 'application/x-www-form-urlencoded', false);
      let apiTokenResponse = JSON.parse(apiTokenResponseJson);
      PreflightGlobalStore.ApiToken = apiTokenResponse.access_token;
      return PreflightGlobalStore.ApiToken;
    } catch (e) {
      e.responseText = 'Authorization failed. Please check your Preflight API key.';
      throw e
    }
  }

  private apiKeyToClientDetails(apiKey: string) {
    try {
      let clientDetails = base64ToString(apiKey)?.split(':');
      if (!clientDetails || clientDetails.length < 2) {
        throw new Error('ApiToken not found or has invalid format');
      }
      return {
        clientId: clientDetails[0],
        clientSecret: clientDetails[1]

      }
    } catch(e){
      throw new Error(`ApiToken "${apiKey}" has invalid format`);
    }
  }
}

export default new AuthService();
