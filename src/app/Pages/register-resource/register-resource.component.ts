import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption} from '@angular/material/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import { LayoutDashboardComponent} from '../../shared/components/layout-dashboard/layout-dashboard.component';
import { MatIcon } from '@angular/material/icon';
import { ResourceService } from '../../Core/Service/resource.service';

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
  tiposDeRecurso: string[] = ['Digital', 'Físico', 'Mixto'];
  tipoDeHabitId: string[] = [
    'Ejercicio Regular', 'Alimentación Saludable', 'Medicación Diaria',
    'Hidratación Adecuada', 'Sueño Reparador', 'Mindfulness',
    'Reducción de Estrés', 'Socialización', 'Desarrollo Personal',
    'Consumo Moderado de Alcohol'
  ];
  mensajeConfirmacion: string | null = null;
  selectedFile: File | null = null;
  fileUploaded: boolean = false;

  constructor(private fb: FormBuilder, private resourceService: ResourceService) {
    this.resourceForm = this.fb.group({
      nombreRecurso: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcionRecurso: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      precioRecurso: [0, [Validators.required, Validators.min(0)]],
      tipoRecurso: ['', Validators.required],
      tipoDeHabitId: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.fileUploaded = true;
      console.log("Archivo seleccionado:", this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      const formData = new FormData();
      formData.append('nombreRecurso', this.resourceForm.get('nombreRecurso')?.value);
      formData.append('descripcionRecurso', this.resourceForm.get('descripcionRecurso')?.value);
      formData.append('precioRecurso', this.resourceForm.get('precioRecurso')?.value);
      formData.append('tipoRecurso', this.resourceForm.get('tipoRecurso')?.value);
      formData.append('tipoDeHabitId', this.resourceForm.get('tipoDeHabitId')?.value);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.resourceService.registrarRecurso(formData).subscribe({
        next: (response) => {
          this.mensajeConfirmacion = 'Recurso registrado con éxito';
          console.log("Recurso registrado:", response);
        },
        error: (error) => {
          console.error("Error al registrar el recurso:", error);
        }
      });
    } else {
      console.error("Formulario inválido");
    }
  }

  onCancel(): void {
    this.resourceForm.reset();
    this.selectedFile = null;
    this.fileUploaded = false;
    this.mensajeConfirmacion = null;

  }
}
