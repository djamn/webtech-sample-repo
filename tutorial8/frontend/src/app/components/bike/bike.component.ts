import {Component, Input} from '@angular/core';
import {Bike} from "../../types/bike";

@Component({
  selector: 'bike-component',
  standalone: true,
  imports: [],
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.css'
})
export class BikeComponent {

  @Input()
  bike: Bike | undefined;

  constructor() {

  }

}
