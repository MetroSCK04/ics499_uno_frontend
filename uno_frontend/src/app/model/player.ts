import { Hand } from "./hand";

export class Player {
    id!: number ;
    gameTag: string = "";
    hand: Hand = new Hand();
  }