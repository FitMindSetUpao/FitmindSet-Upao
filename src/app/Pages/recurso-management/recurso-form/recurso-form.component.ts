import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recurso-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
  ],
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.scss'],
})
export class RecursoFormComponent implements OnInit {
  form!: FormGroup;
  recursoid?: number;
  archivoSeleccionado: string = '';
  tiposRecurso: string[] = ['Documento', 'Video', 'Audio'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.recursoid = 1; // Simulación de ID
    this.crearFormulario();
    if (this.recursoid) {
      this.cargarDatosRecurso(); // Simulación de datos de recurso
    }
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      tipoDeRecurso: ['', Validators.required],
    });
  }

  cargarDatosRecurso(): void {
    const recursoFicticio = {
      nombre: 'Recurso de Prueba',
      descripcion: 'Este es un recurso de prueba para actualizar',
      precio: 100.5,
      tipoDeRecurso: 'Documento',
    };

    this.form.patchValue(recursoFicticio);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.archivoSeleccionado = input.files[0].name;
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datosFormulario = this.form.value;
    console.log('Datos enviados:', datosFormulario);

    this.router.navigate(['/autor/recursos/list']);
  }
}
