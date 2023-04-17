import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uno-card',
  templateUrl: './uno-card.component.html',
  styleUrls: ['./uno-card.component.css']
})
export class UnoCardComponent {
  @Input() number!: number;
  @Input() color!: string;

  getCardClasses(): string {
    return `num-${this.number} clr-${this.color}`;
  }
}
