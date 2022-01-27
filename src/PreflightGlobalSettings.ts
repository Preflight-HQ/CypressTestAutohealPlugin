export default class PreflightGlobalSettings {
  constructor() {
    throw new Error('cannot instantiate using a static class');
  }
  public static apiUrl:string = 'https://localhost:44365/v1/';
  public static autohealApiToken:string|null;
  public static currentTestId:string|null;
  public static tests:any[] = [];
  public static testsReports:any[] = [];


}
