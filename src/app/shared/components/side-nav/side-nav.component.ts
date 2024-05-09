import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  private authService = inject(AuthService);


  onLogout(){
    this.authService.logout()
  }
}
