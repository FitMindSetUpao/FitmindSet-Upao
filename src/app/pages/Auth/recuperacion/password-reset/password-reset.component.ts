import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { ActivatedRoute } from '@angular/router';
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
    FooterComponent
  ],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'] // Corrige 'styleUrl' a 'styleUrls'
})
export class PasswordResetComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  resetForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$') // Al menos una letra y un número
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
      const token = this.route.snapshot.queryParams['token']; // Obtener el token de la ruta
      const newPassword = this.newPassword?.value;
  
      // Validar que el token no sea nulo o indefinido
      if (token) {
        // Llama al método resetPassword pasando el token y la nueva contraseña
        this.authService.resetPassword(token, newPassword!).subscribe({
          next: () => {
            this.showSnackBar('Contraseña cambiada con éxito');
            this.router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.error('Error al cambiar la contraseña:', err);
            this.snackBar.open('Error al cambiar la contraseña. Inténtalo nuevamente.', 'Cerrar', { duration: 3000 });
          }
        });
      } else {
        this.snackBar.open('El token es inválido o ha expirado.', 'Cerrar', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Por favor, verifica los campos del formulario.', 'Cerrar', { duration: 3000 });
    }
  }
  
  passwordsMatch(): boolean {
    return this.newPassword?.value === this.confirmPassword?.value; // Usa === para comparación estricta
  }
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
