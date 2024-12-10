import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseURL = "http://localhost:3000/api/bikes";

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  constructor(private http: HttpClient) {

  }

  getBikes(): Observable<any> {
    return this.http.get(`${baseURL}/`);
  }

  deleteBike(bikeId: number) {
    return this.http.delete(`${baseURL}/${bikeId}`)
  }

}
