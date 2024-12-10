import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Bike} from "../../types/bike";
import {BikesService} from "../../services/bikes.service";

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

  @Output() deleteSuccess = new EventEmitter<number>();

  constructor(private bikesService: BikesService) {
  }

  deleteItem() {
    if (this.bike) {
      this.bikesService.deleteBike(this.bike.bike_id).subscribe({
          next: (res) => {
            this.deleteSuccess.emit(this.bike?.bike_id); // Notify parent
          },
          error: (err) => {
            console.error("Could not delete bike")
          }
        }
      )
    }
  }

}
