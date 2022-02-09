import { FormElement } from "../models/FormElement";
export declare class TestExecutor {
    submitForm(form: FormElement): boolean;
    fillForm(form: FormElement, inputData: any[]): boolean;
}
declare const testExecutor: TestExecutor;
export { testExecutor };
