import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption} from '@angular/material/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import { LayoutDashboardComponent} from '../../shared/components/layout-dashboard/layout-dashboard.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-register-resource',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatOption,
    NgIf,
    MatSelect,
    NgForOf,
    MatLabel,
    MatError,
    MatCardContent,
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    MatCardTitle,
    LayoutDashboardComponent,
    MatIcon
  ],
  templateUrl: './register-resource.component.html',
  styleUrl: './register-resource.component.scss'
})
export class RegisterResourceComponent {
  resourceForm: FormGroup;
  tiposDeRecurso: string[] = ['Digital', 'Físico'];

  constructor(private fb: FormBuilder) {
    this.resourceForm = this.fb.group({
      nombreRecurso: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcionRecurso: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      precioRecurso: [0, [Validators.required, Validators.min(0)]],
      tipoRecurso: ['', Validators.required],
      tipoDeHabitId: ['', Validators.required]
    });
  }

  OnInit(): void {}

  onSubmit(): void {
    if (this.resourceForm.valid) {
      console.log("Recurso registrado:", this.resourceForm.value);
      // Aquí puedes añadir la lógica para enviar el formulario a un servicio
    } else {
      console.error("Formulario inválido");
    }
  }

  onCancel() {
    this.resourceForm.reset();
  }
}
