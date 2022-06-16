export default class PreflightGlobalStore {
  public static ApiToken:string = null;
  constructor() {
    throw new Error('cannot instantiate using a static class');
  }
  private static isDevMode = false;
  public static apiUrl:string = PreflightGlobalStore.isDevMode ? 'https://apidev.preflightdev.com/v1/' : 'https://api.preflight.com/v1/';
  public static authServerUrl:string = PreflightGlobalStore.isDevMode ? 'https://authdev.preflightdev.com' : 'https://auth.preflight.com';
  public static emailDomain:string = PreflightGlobalStore.isDevMode ? 'test-dev.preflight.com' : 'test.preflight.com';
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
    console.log(PreflightGlobalStore.apiUrl);
    PreflightGlobalStore.state = {
      variables: {},
      currentTestId: null,
      currentTestData: null,
      testReport: []
    }
  }
}
