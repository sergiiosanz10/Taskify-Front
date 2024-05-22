import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStatus } from './shared/interfaces';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject(AuthService);
  private router = inject(Router)
  public finishedAuthCheck = computed<boolean>( () => {

    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }

    return true;
  })

  public authStatusChangedEffect = effect( () => {

    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.noAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }

  })

}
