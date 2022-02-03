export default class ElementFinderSearchData {
  public actionData: any[] = []

  constructor(actionData: any[]){
    this.actionData = actionData;
  }

  public get mainSelectors(): string[] {
    return [];
    return this.actionData.filter(ads => ads.type == 'cssselector' || ads.type == 'xpathselector').map(d => d.value);
  }

  public get possibleSelectors(): string[] {
    return [];
    return this.actionData.filter(ads => ads.type == 'possiblecssselector' || ads.type == 'possiblexpathselector').map(d => d.value);
  }

  public get expectedText(): string | null {
    let screenshotTargetPositionData = JSON.parse(this.actionData.find(ads => ads.type == 'screenshottargetposition')?.value);
    if(screenshotTargetPositionData?.elementDetails.length <= 0){
      return null;
    }
    return screenshotTargetPositionData?.elementDetails[0]?.target?.text
  }
}
