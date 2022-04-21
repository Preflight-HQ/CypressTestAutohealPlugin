import {ContextParserDataDB} from "../packages/preflight-web-parser/lib/webParserPackage/index";

export default class CyPomAutohealData {
  public selectors: string[];
  public parserData: ContextParserDataDB

  constructor(selectors: string[], parserData: ContextParserDataDB){
    this.selectors = selectors;
    this.parserData = parserData;
  }
}


/*
TODO otestovat autoheal pri behu testu
TODO ukladat stazene POM autoheal elementy na pozdejsi pouziti
TODO POM autoheal codu, prepisovani souboru

 */
