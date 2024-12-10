import {Component, OnInit} from '@angular/core';
import {Bike} from "../../types/bike";
import {BikesService} from "../../services/bikes.service";
import {BikeComponent} from "../bike/bike.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'bikes-component',
  standalone: true,
  imports: [
    BikeComponent,
    NgForOf
  ],
  templateUrl: './bikes.component.html',
  styleUrl: './bikes.component.css'
})

export class BikesComponent implements OnInit {
  bikes: Bike[] = [];

  constructor(private bikesService: BikesService) {
  }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.bikesService.getBikes().subscribe(data => {
      this.bikes = data;
      console.log(this.bikes)
    })
  }

}
