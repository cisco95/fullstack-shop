import { Component, OnInit } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { Router } from '@angular/router';
import { ListingsService } from '../listings.service';



@Component({
  selector: 'app-new-listing-page',
  standalone: true,
  imports: [ListingDataFormComponent],
  templateUrl: './new-listing-page.component.html',
  styleUrl: './new-listing-page.component.css'
})
export class NewListingPageComponent {
  constructor(
    private router: Router,
    private listingsService: ListingsService,
  ) {}

  ngOnInit(): void {

  }

  onSubmit({name, description, price}: {name: string, description: string, price: number}): void {
    this.listingsService.createNewListing(name, description, price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }

}
