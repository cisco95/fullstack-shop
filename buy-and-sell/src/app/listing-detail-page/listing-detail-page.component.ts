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
  isLoading: boolean = false;
  listing!: Listing;
  constructor(
    private route: ActivatedRoute, 
    private listingsService: ListingsService,
  ) {}
  
  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    
    // This is for testing the api, does nothing but logs "service called". 
    // this.listingsService.getListings().subscribe(()=>{
    //   console.log("service called")
    // })

    // This only works if using getAllListings route and filters down for item. 
    // this.listingsService.getListings()
    //   .subscribe((listing) => {
    //     this.listing = listing.filter((item)=> item.id === id)[0]  
    //     this.isLoading = false;
    //   })

    // These have not been working, uses getListingById route. 

    this.listingsService.getListingById(id)
      .subscribe((listing) => {
        console.log("Received listing: ", listing)
        this.listing = listing[0]  
        this.isLoading = false;
      })

    // this.listingsService.getListingById(id)
    //   .subscribe((listing)=>{
    //     this.listing = listing;
    //     this.isLoading = false;
    //   })
      
    // this.listingsService.addViewToListing(id).subscribe((listing) => {
    //     this.listing = [listing].filter((item)=> item.id === id)[0]
    //   })
  }

}
// NOT CURRENTLY WORKING, INVESTIGATE FURTHER. 