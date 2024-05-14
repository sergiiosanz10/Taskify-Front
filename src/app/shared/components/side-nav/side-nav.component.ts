import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { User } from '../../../auth/interfaces';
import { DtoResponseGetUser } from '../../../auth/interfaces/DtoResponseGetUser';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  public admin: number = 0;


  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    const body = document.body;
    const toggle = document.getElementById('toggle') as HTMLInputElement;
    if (theme) {
      body.classList.add(theme);
      if (theme === 'dark-mode') {
        toggle.checked = true;
      } else {
        toggle.checked = false;
      }
    } else {
      body.classList.add('light-mode');
      toggle.checked = false;
    }

    this.userById()
  }

  onLogout() {
    this.authService.logout()
  }

  toggleTheme() {
    const body = document.body;
    const toggle = document.getElementById('toggle') as HTMLInputElement;
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
      toggle.checked = false;
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
      toggle.checked = true;
    }
  }


  userById() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.dashboardService.getUserByToken(token)
      .subscribe(
        (admin: DtoResponseGetUser) => this.admin = admin.user.admin);
  }
}
