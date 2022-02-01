import PreflightGlobalStore from "../PreflightGlobalStore";

class ReportService {
  public pushData(selector, actionId, searchResult){
    if(!PreflightGlobalStore.state.testsReport){
      PreflightGlobalStore.state.testsReport = [];
    }
    PreflightGlobalStore.state.testsReport.push({
      actionId,
      originalSelector: selector,
      newSelector: searchResult.selector
    });
  }
}

export default new ReportService();
