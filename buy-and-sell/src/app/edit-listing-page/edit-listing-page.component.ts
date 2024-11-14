import { Component, OnInit } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,
  imports: [ListingDataFormComponent, NgIf],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css'
})
export class EditListingPageComponent implements OnInit {
  listing!: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private listingsService: ListingsService,
  ){}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.listingsService.getListingById(id)
      .subscribe(listing => this.listing = listing);
  }

  onSubmit({name, description, price}:{name:string, description:string, price:number}):void {
    this.listingsService.editListing(this.listing.id, name, description, price)
      .subscribe(()=> {
        this.router.navigateByUrl('/my-listings');
      })
  }
  
}