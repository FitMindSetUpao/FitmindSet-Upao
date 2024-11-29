import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, 
    MatInputModule,
     MatCardModule, 
     RouterLink, 
     FormsModule, 
     ReactiveFormsModule, 
     MatSnackBarModule,
     MatFormFieldModule,
     MatSelectModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: () => {
          this.showSnackBar('Usuario creado correctamente');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.showSnackBar(error.error.message || 'Error al crear el usuario');
        }
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
