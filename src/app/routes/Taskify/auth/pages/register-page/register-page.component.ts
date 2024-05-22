import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router)


  public myForm: FormGroup = this.fb.group({
    name:       ['', [Validators.required]],
    email:      ['', [Validators.required, Validators.email]],
    password:   ['', [Validators.required, Validators.minLength(6)]],
    password2:  ['', [Validators.required]],
  }, {
    validators: [
      this.authService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]
  })


  register(){
    const {name, email, password, password2} = this.myForm.value;

    if (password !== password2) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }
    this.authService.register(name, email, password)
      .subscribe( {
        next: () => this.router.navigateByUrl('/portfolio/projects/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }
}
