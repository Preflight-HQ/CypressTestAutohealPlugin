import PreflightGlobalStore from "../PreflightGlobalStore";
import authService from "./authService";

export default class BaseRequestService {
  baseUrl = '';
  public authHeaders: any = {};
  public static RequestFunction: (method, url, data, responseType, contentType, authorize) => any = BaseRequestService.xhrRequest

  constructor(baseUrl = ''){
    this.baseUrl = baseUrl;
  }

  private get apiKey(){
    return PreflightGlobalStore.ApiKey;
  }

  makeRequest(method, endpoint, data = undefined, responseType = null, contentType="application/json;charset=UTF-8", authorize: boolean = false) : Promise<string|null> {
    let accessToken = null
    if(BaseRequestService.RequestFunction) {
      return new Promise(async (resolve, reject) => {
        try {
          if (authorize) {
            accessToken = await authService.getAccessToken(this.apiKey);
          }
          let result = await BaseRequestService.RequestFunction(method, this.baseUrl + endpoint, data, responseType, contentType, accessToken);
          let response = result.body || result.response;
          resolve(typeof response !== 'string' ? JSON.stringify(response) : response);
        } catch (e) {
          reject({
            status: e.status,
            statusText: e.statusText,
            responseText: e.body ? e.body : JSON.stringify(e.responseText),
          })
        }
      });
    }

  }

  public static xhrRequest(method, url, data, responseType, contentType, accessToken) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      if(responseType){
        xhr.responseType = responseType;
      }
      xhr.open(method, url);
      if(contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
      }
      if(accessToken) {
        xhr.setRequestHeader('Authorization', 'bearer ' + accessToken);
      }

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr);
        } else {
          reject(BaseRequestService.buildRejectResponse(this.status, xhr));
        }
      };
      xhr.onerror = function () {
        reject(BaseRequestService.buildRejectResponse(this.status, xhr));
      };
      xhr.send(data);
    });
  }

  async makeAuthRequest(method, endpoint, data = undefined, responseType = null, contentType="application/json;charset=UTF-8") : Promise<string|null> {
    try {
      return await this.makeRequest(method, endpoint, data, responseType, contentType, true);
    } catch (e) {
      if(e.status == 401){
        await authService.getAccessToken(this.apiKey, true);
        return await this.makeRequest(method, endpoint, data, responseType, contentType, true);
      } else {
        throw e;
      }
    }
  }

  private static buildRejectResponse(status, xhr){
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
