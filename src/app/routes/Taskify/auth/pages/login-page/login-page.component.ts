import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router)
  public isLoading    = signal(true);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })


  login() {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard'),
          this.isLoading.set(false);
        },
        error: (message) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }

}
