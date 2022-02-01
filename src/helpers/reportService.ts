import PreflightGlobalStore from "../PreflightGlobalStore";

class ReportService {
  public pushData(selector, actionId, searchResult){
    if(!PreflightGlobalStore.state.testReport){
      PreflightGlobalStore.state.testReport = [];
    }
    PreflightGlobalStore.state.testReport.push({
      actionId,
      originalSelector: selector,
      newSelector: searchResult.selector
    });
  }
}

export default new ReportService();
