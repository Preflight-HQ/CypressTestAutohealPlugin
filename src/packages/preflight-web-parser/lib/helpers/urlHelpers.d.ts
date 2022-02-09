declare class UrlHelpers {
    getRelativeUrl(inputUrl?: string, includeHost?: boolean): string;
    getHost(inputUrl: string | URL): string;
    private getRelativeUrlPathAndParams;
    private getGenericType;
    private isEmail;
    private isGuid;
    containsRelativeData(url: string | null): false | RegExpMatchArray | null;
}
declare const _default: UrlHelpers;
export default _default;
