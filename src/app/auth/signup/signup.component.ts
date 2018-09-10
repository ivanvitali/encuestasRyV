import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  private loadingSubscription: Subscription;

  constructor( 
    private authService: AuthService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(form: NgForm) {
    let nameCapitalized = this.capitalize(form.value.name);
    this.authService.registerUser({
      name: nameCapitalized,
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    } 
  }

  // Capitalize the first lettter of every word of the string
  private capitalize(name: string){
    return name.toLowerCase().replace( /\b./g, function(word) { return word.toUpperCase(); } );
};

}
