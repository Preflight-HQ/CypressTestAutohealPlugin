import { Primitive } from "../models/primitive";
import { FormElement } from "../models/FormElement";
import { ParsedElement } from "../models/ParsedElement";
import { BaseScannerParser } from "./BaseScannerParser";
declare class FormParser extends BaseScannerParser {
    scanForElements(root: Primitive, markedElements: ParsedElement[]): FormElement[] | null;
    private findFormsByElementDistance;
    private createFormElement;
    private isLoginForm;
    private isSignUpForm;
    private findHeading;
    private getHeadingConfidence;
    private findSubmitButton;
}
declare const formParser: FormParser;
export { formParser };
