import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  private authService = inject(AuthService);

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
}
