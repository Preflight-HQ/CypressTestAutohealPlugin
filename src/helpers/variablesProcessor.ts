import PreflightGlobalStore from "../PreflightGlobalStore";
import uuidv4 from "./globalHelpers";

class VariablesProcessor {
  public get generatedEmail(): string{
    let email = PreflightGlobalStore.state.email || this.generateNewEmail();
    PreflightGlobalStore.state.email = email;
    return email;
  }

  public generateNewEmail() {
    const email = `${uuidv4().substring(0, 16)}@${PreflightGlobalStore.emailDomain}`;
    return email;
  }
}

export default new VariablesProcessor();
