import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  type = 'no-visible'

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService
  ) {}

  form = this.formBuilder.group({
    email: ['usuario@gmail.com', [Validators.email, Validators.required]],
    password: ['usuario', [Validators.minLength(6), Validators.required]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
  }
}
