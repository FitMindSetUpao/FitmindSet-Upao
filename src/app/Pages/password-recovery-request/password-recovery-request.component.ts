import { Component, inject, Signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../../Core/Service/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-password-recovery-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './password-recovery-request.component.html',
  styleUrl: './password-recovery-request.component.scss'
})
export class PasswordRecoveryRequestComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  sendEmail() {
    if (this.emailControl.valid) {
      this.authService.sendRecoveryEmail(this.emailControl.value!).subscribe({
        next: () => {
          this.snackBar.open('Correo de recuperación enviado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/password-recovery-confirmation']);
        },
        error: (err) => {
          console.error('Error al enviar el correo:', err);
          this.snackBar.open('Error al enviar el correo. Inténtalo nuevamente.', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
