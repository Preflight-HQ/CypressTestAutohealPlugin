export default class PreflightGlobalStore {
  public static ApiToken:string = null;
  constructor() {
    throw new Error('cannot instantiate using a static class');
  }
  public static apiUrl:string = 'https://apidev.preflightdev.com/v1/';
  public static authServerUrl:string = 'https://authdev.preflightdev.com';
  public static emailDomain:string = 'test-dev.preflight.com';
  public static adminEmailDomain:string = 'testadmin.preflight.com';
  public static ApiKey:string|null;
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
