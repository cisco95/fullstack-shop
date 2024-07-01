import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-listing-page',
  standalone: true,
  imports: [],
  templateUrl: './new-listing-page.component.html',
  styleUrl: './new-listing-page.component.css'
})
export class NewListingPageComponent implements OnInit{
  name: string = '';
  description: string = '';
  price: string = '';
  
  constructor(
    private router: Router, 
  ) { }


  ngOnInit(): void {
  }

  onSubmit(): void {
    alert("Creating a new listing...");
    this.router.navigateByUrl('/my-listings');
  }


}
