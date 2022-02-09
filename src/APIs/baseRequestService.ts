import PreflightGlobalStore from "../PreflightGlobalStore";
import authService from "./authService";

export default class BaseRequestService {
  baseUrl = '';
  public authHeaders: any = {};

  constructor(baseUrl = ''){
    this.baseUrl = baseUrl;
  }

  private get apiKey(){
    return PreflightGlobalStore.ApiKey;
  }

  makeRequest(method, endpoint, data = undefined, responseType = null, contentType="application/json;charset=UTF-8", authorize: boolean = true) : Promise<string|null> {
    return new Promise(async (resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let that = this;
      if(responseType){
        xhr.responseType = responseType;
      }
      xhr.open(method, this.baseUrl + endpoint);
      if(contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
      }
      if(authorize) {
        let accessToken = await authService.getAccessToken(this.apiKey);
        xhr.setRequestHeader('Authorization', 'bearer ' + accessToken);
      }

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {

          reject(that.buildRejectResponse(this.status, xhr));
        }
      };
      xhr.onerror = function () {
        reject(that.buildRejectResponse(this.status, xhr));
      };
      xhr.send(data);
    });
  }

  async makeAuthRequest(method, endpoint, data = undefined, responseType = null, contentType="application/json;charset=UTF-8") : Promise<string|null> {
    try {
      return await this.makeRequest(method, endpoint, data, responseType, contentType);
    } catch (e) {
      if(e.status == 401){
        await authService.getAccessToken(this.apiKey, true);
        return await this.makeRequest(method, endpoint, data, responseType, contentType);
      } else {
        throw e;
      }
    }
  }

  private buildRejectResponse(status, xhr){
    let responseText = null;
    let statusText = null;
    try {
      responseText = xhr.responseText
      statusText = xhr.statusText
    }
    catch (e) {}
    return {
      status,
      statusText,
      responseText: status == 500 ? 'Connection to the Preflight server failed.': responseText,
      responseTextDetail: responseText
    }
  }

  post(endpoint, data, isAuth = true) : Promise<string>{
    if (typeof data !== 'string' && !(data instanceof String)) {
      data = JSON.stringify(data);
    }
    if(isAuth) {
      return this.makeAuthRequest('POST', endpoint, data);
    } else {
      return this.makeRequest('POST', endpoint, data);
    }
  }

  get(endpoint, params = null, isAuth = true){
    if(params){
      endpoint += '?' + Object.keys(params).map(p => `${p}=${params[p]}`).join('&')
    }
    if(isAuth) {
      return this.makeAuthRequest('GET', endpoint);
    } else {
      return this.makeRequest('GET', endpoint);
    }
  }

  public getBlob(endpoint, isAuth = true){
    if(isAuth) {
      return this.makeAuthRequest('GET', endpoint, undefined, 'blob');
    } else {
      return this.makeRequest('GET', endpoint, undefined, 'blob');
    }

  }
}
