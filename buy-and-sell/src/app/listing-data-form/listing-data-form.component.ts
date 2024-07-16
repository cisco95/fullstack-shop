import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Listing } from '../types';


@Component({
  selector: 'app-listing-data-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.css'
})

export class ListingDataFormComponent implements OnInit{
  @Input() buttonText= '';
  @Input() currentName = "";
  @Input() currentDescription = "";
  @Input() currentPrice: number = 0;

  
  @Output() onSubmit = new EventEmitter<Listing>();
  name: string = '';
  description: string = '';
  price: string = '';

  constructor(
    private router: Router, 
  ) { }


  ngOnInit(): void {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice.toString();
  }

  onButtonClicked(): void {
    this.onSubmit.emit({
      id: null!,
      name: this.name,
      description: this.description,
      price: Number(this.price),
    })
  }


}
