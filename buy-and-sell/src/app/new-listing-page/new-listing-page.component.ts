import { Component, OnInit } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { Router } from '@angular/router';


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
  ) {}

  ngOnInit(): void {

  }

  onSubmit(): void {
    alert("Creating a new listing...");
    this.router.navigateByUrl('/my-listings');
    
  }

}
