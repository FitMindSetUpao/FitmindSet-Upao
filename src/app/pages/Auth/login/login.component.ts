import { Component, inject } from '@angular/core';
import{
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
}from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  constructor(){
    this.loginForm = this.fb.group({
      correo:['',[Validators.required,Validators.email]],
      Contraseña: ['', Validators.required,Validators.minLength(8)],
    });
  }
  controlHasError(control:string, error:string){
    return this.loginForm.controls[control].hasError(error);
  }
  showSnackBar(message:string){
    this.snackBar.open(message,'Cerrar',{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition: 'bottom'
    });
  }
  onSubmit(){
    if(this.loginForm.valid){
      const credentials = this.loginForm.value;
      console.info('Credenciales:',credentials);
      this.showSnackBar('Inicio de sesión exitoso')
    }
  }

}
