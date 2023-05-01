export class Card {
    cardID?: number;
    color: string;
    num: number;
    type: string;
  
    constructor(color: string, num: number, type: string) {
      this.color = color;
      this.num = num;
      this.type=type;
    }
  }
  