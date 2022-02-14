export default class Selector {
  public score: number;
  public value: string;
  public type: string;

  constructor(type: string, value: string, score: number = 1){
    this.type = type;
    this.value = value;
    this.score = score;
  }
}
