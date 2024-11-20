import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            ListingsPageComponent, 
            NavBarComponent,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy-and-sell';
}
