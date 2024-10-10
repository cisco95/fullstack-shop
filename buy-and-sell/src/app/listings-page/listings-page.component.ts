import { Component } from '@angular/core';
import { Listing } from '../types';
// import { fakeListings } from '../fake-data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../listings.service';

// Tools to make network requests, need: 
// RxJS - library to work with async and event based code easier
// HTTPClient - angular module to make request to server

@Component({
  selector: 'app-listings-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.css'
})
export class ListingsPageComponent {
  listings: Listing[] = [];
  
  constructor(
    private listingsService: ListingsService
  ) {}
  
  
  ngOnInit(): void {
    this.listingsService.getListings("0")
      .subscribe(listings => this.listings = listings)
  }
  
  
  
}
