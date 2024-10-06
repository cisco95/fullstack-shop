import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { fakeListings } from '../fake-data';
import { Listing } from '../types';
import { RouterLink } from '@angular/router';
import { ListingsService } from '../listings.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.css'
})
export class ListingDetailPageComponent implements OnInit {
  isLoading: boolean = true;
  listing!: Listing;
  
  constructor(
    private route: ActivatedRoute, 
    private listingsService: ListingsService,
  ) {}
  
  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.listingsService.getListings()
      .subscribe((listing) => {
        this.listing = listing.filter((item)=> item.id === id)[0] //only works if using getAllListings route. 
        this.isLoading = false;
      })
    // this.listingsService.addViewToListing(id!)
    //   .subscribe(() => console.log("Views Updated"))
  }

}
// NOT CURRENTLY WORKING, INVESTIGATE FURTHER. 