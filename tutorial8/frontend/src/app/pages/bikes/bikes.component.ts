import { Component } from '@angular/core';
import { BikesComponent } from "../../components/bikes/bikes.component";

@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [BikesComponent],
  templateUrl: './bikes.component.html',
  styleUrl: './bikes.component.css'
})
export class Bikes {

}
