export default class PreflightGlobalStore {
  constructor() {
    throw new Error('cannot instantiate using a static class');
  }
  public static apiUrl:string = 'https://apidev.preflightdev.com/v1/';
  public static emailApiBaseUrl:string = 'https://preflightemailparser-dev.azurewebsites.net/api/';
  public static emailDomain:string = 'test-dev.preflight.com';
  public static autohealApiToken:string|null;
  public static state: any = {
    email: null,
    currentTestId: null,
    currentTestData: null,
    testReport: []
  }

  public static initialize() {
    PreflightGlobalStore.state = {
      email: null,
      currentTestId: null,
      currentTestData: null,
      testReport: []
    }
  }
}
