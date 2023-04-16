import { Card } from "./card";
import { Deck } from "./deck";
import { Player } from "./player";

export class Uno {
    playedCards!: Array<Card>;
    playerList!: Array<Player>; //PlayerList
    playedCard!: Card;
    deck!: Deck;
}