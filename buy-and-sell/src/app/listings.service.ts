import { Injectable } from '@angular/core';
// import { fakeListings } from './fake-data';
import { Listing } from './types';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  
  constructor(
    private http: HttpClient, 
  ) { }
  
  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }
}
