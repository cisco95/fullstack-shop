import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { CommonModule, NgIf } from '@angular/common';
// import { GoogleAuthProvider } from 'firebase/auth/web-extension';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            RouterOutlet, 
            ListingsPageComponent, 
            NavBarComponent,
            NgIf,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy-and-sell';

  constructor(
    public auth: AngularFireAuth,
  ) { }

  signInClicked(): void {
    this.auth.signInWithPopup(new GoogleAuthProvider());
  }


  signOutClicked(): void {
    this.auth.signOut();
  }

}
