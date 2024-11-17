import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { AuthRequest } from '../../../shared/models/auth-request.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule,
    MatSnackBarModule,MatButtonModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar= inject(MatSnackBar);
  private authService = inject(AuthService);

  private readonly CUSTOMER_ROLE = 'CUSTOMER';
  private readonly AUTHOR_ROLE = 'AUTHOR';
  private readonly CUSTOMER_ROUTE = '/customer';
  private readonly AUTHOR_ROUTE = 'autor/recursos/list';
  private readonly DEFAULT_ROUTE = '/home';

  constructor(){
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['',[Validators.required]]
    });
  }

  controlHasError(control: string, error: string){
    return this.loginForm.controls[control].hasError(error);
  }

 isLoading = false;
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca todos los campos como "tocados" para que se muestren los errores
      return;
    }
  
    const credentials: AuthRequest = this.loginForm.value;
  
    this.authService.login(credentials).subscribe({
      next: () => {
        this.showSnackBar('Inicio de sesión exitoso');
        this.redirectUserBasedOnRole();
      },
      error: () => {
        this.showSnackBar('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      },
    });
  }
  private redirectUserBasedOnRole(): void {
    const userRole = this.authService.getUserRole();

    if (userRole === this.CUSTOMER_ROLE) {
      this.router.navigate([this.CUSTOMER_ROUTE]);
    } else if (userRole === this.AUTHOR_ROLE) {
      this.router.navigate([this.AUTHOR_ROUTE]);
    } else {
      this.router.navigate([this.DEFAULT_ROUTE]);
    }
  }

  private showSnackBar(message:string): void{
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
