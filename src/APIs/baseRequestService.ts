export default class BaseRequestService {
  baseUrl = '';

  constructor(baseUrl = ''){
    this.baseUrl = baseUrl;
  }

  makeRequest(method, endpoint, data = undefined, responseType = null, contentType="application/json;charset=UTF-8") : Promise<string|null>{
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let that = this;
      if(responseType){
        xhr.responseType = responseType;
      }
      xhr.open(method, this.baseUrl + endpoint);
      if(contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
      }
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {

          reject(that.buldRejectResponse(this.status, xhr));
        }
      };
      xhr.onerror = function () {
        reject(that.buldRejectResponse(this.status, xhr));
      };
      xhr.send(data);
    });
  }

  private buldRejectResponse(status, xhr){
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
      responseText
    }
  }

  post(endpoint, data) : Promise<string>{
    if (typeof data !== 'string' && !(data instanceof String)) {
      data = JSON.stringify(data);
    }
    return this.makeRequest('POST', endpoint, data);
  }

  postFile(url, data) {
    return this.makeRequest('POST', url, data, null, null);
  }

  get(endpoint){
    return this.makeRequest('GET', endpoint);
  }

  public getBlob(endpoint){
    return this.makeRequest('GET', endpoint, undefined, 'blob');
  }


}