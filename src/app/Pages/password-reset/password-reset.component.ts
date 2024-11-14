import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../Core/Service/auth.service';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NavbarComponent
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  resetForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
    ]),
    confirmPassword: new FormControl('', Validators.required)
  });

  get newPassword() {
    return this.resetForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.resetForm.valid && this.passwordsMatch()) {
      const newPassword = this.newPassword?.value;
      this.authService.resetPassword(newPassword!).subscribe({
        next: () => {
          this.snackBar.open('Contraseña cambiada con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al cambiar la contraseña:', err);
          this.snackBar.open('Error al cambiar la contraseña. Inténtalo nuevamente.', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, verifica los campos del formulario.', 'Cerrar', { duration: 3000 });
    }
  }

  passwordsMatch(): boolean {
    return this.newPassword?.value == this.confirmPassword?.value;
  }
}
