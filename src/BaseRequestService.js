export default class BaseRequestService {
  baseUrl = '';

  constructor(baseUrl = ''){
    this.baseUrl = baseUrl;
  }

  makeRequest(method, endpoint, data, responseType = null, contentType="application/json;charset=UTF-8"){
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
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
          reject({
            status: this.status,
            statusText: xhr.statusText,
            responseText: xhr.responseText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          responseText: xhr.responseText
        });
      };
      xhr.send(data);
    });
  }

  post(endpoint, data){
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

  getBlob(endpoint){
    return this.makeRequest('GET', endpoint, null, 'blob');
  }


}
