import { Primitive } from "../models/primitive";
import { InputElement } from "../models/InputElement";
import { BaseScannerParser } from "./BaseScannerParser";
import { RadioButtonElement } from "../models/RadioButtonElement";
import { CheckboxElement } from "../models/CheckboxElement";
import { SelectInputElement } from "../models/SelectInputElement";
import { ParsedElement } from "../models/ParsedElement";
import { FileInputElement } from "../models/FileInputElement";
declare class InputParser extends BaseScannerParser {
    scanForElements(el: Primitive, markedElements: ParsedElement[]): (InputElement | RadioButtonElement | CheckboxElement | SelectInputElement | FileInputElement)[] | null;
    private CreateFileInput;
    private createInputElement;
    private findWrapperOfInvisibleInput;
    private findPurposeFromAttributes;
    private isRadioButton;
    private isSelectInput;
    private isFileUploadInput;
    private isHiddenInput;
    private isCheckbox;
    private CreateSelectInput;
    private createRadioButton;
    private createCheckbox;
    private findButtonCover;
}
declare const inputParser: InputParser;
export { inputParser };
