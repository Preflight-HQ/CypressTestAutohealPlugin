export default class PreflightGlobalStore {
  constructor() {
    throw new Error('cannot instantiate using a static class');
  }
  public static apiUrl:string = 'https://localhost:44365/v1/';
  public static emailDomain:string = 'test-dev.preflight.com';
  public static adminEmailDomain:string = 'testadmin-dev.preflight.com';
  public static autohealApiToken:string|null;
  public static fixedFiles: string[] = [];
  public static testsStart: Date;
  public static state: any = {
    variables: {},
    currentTestId: null,
    currentTestData: null,
    testReport: []
  }

  public static initialize() {
    PreflightGlobalStore.state = {
      variables: {},
      currentTestId: null,
      currentTestData: null,
      testReport: []
    }
  }
}
