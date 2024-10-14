import { Injectable } from '@angular/core';
// import { fakeListings } from './fake-data';
import { Listing } from './types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  // use for testing. 
  // private apiUrl = 'https://upgraded-space-fortnight-q9qq5gw9479c9q7x-8000.app.github.dev/api'
  
  constructor(
    private http: HttpClient, 
  ) { }
  
  getListings(): Observable<Listing[]> {
    // console.log(id)
    return this.http.get<Listing[]>(`/api/listings`);
  }

  getListingById(id: string): Observable<Listing> { //This is getting called, but the right thing is not getting returned. Why different than the other api endpoint??
    console.log("inside the services:", id)
    return this.http.get<Listing>(`/api/listings/${id}'`) //https://upgraded-space-fortnight-q9qq5gw9479c9q7x-8000.app.github.dev/api...
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      // `${this.apiUrl}/listings/${id}/add-view`,
      `/api/listings/${id}/add-view`,
      {}, 
      httpOptions
    )
  }
}
