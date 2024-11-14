import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listings-page',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './my-listings-page.component.html',
  styleUrl: './my-listings-page.component.css'
})
export class MyListingsPageComponent implements OnInit{
  listings: Listing[] = [];
  constructor(
    private listingsService: ListingsService,
  ){}

  ngOnInit(): void {
    this.listingsService.getListingsForUser()
      .subscribe(listings => this.listings = listings);
  }

  onDeleteClicked(listingId: string): void {
    this.listingsService.deleteListing(listingId)
      .subscribe(() => {
        console.log("deleted!");
        this.listings = this.listings.filter(
          listing => listing.id !== listingId
        );
      })
  }

}
