// src/app/pages/register.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registrationSuccess = signal(false); // Usamos una señal para reaccionar al estado


  constructor(private fb: FormBuilder) {}


  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit() {
    if (this.registerForm.valid) {
      // Aquí se puede enviar al servidor si estuviera configurado
      console.log('Registro exitoso:', this.registerForm.value);
      this.registrationSuccess.set(true);
      this.registerForm.reset();
    }
  }


  get username() {
    return this.registerForm.get('username');
  }


  get email() {
    return this.registerForm.get('email');
  }


  get password() {
    return this.registerForm.get('password');
  }
}
