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
import { CommonModule } from '@angular/common'; // Importa el CommonModule

@Component({
  selector: 'app-recurso-form',
  standalone: true,
  imports: [
    CommonModule, // Asegúrate de incluirlo aquí
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
  tiposRecurso = ['Documento', 'Video', 'Audio'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.recursoid = undefined; // Simulación de ID
    this.crearFormulario();
    if (this.recursoid) {
      this.cargarDatosFicticios(); // Simula la carga de datos para edición
    }
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
      ],
      descripcion: ['', [Validators.required]],
      tipoRecurso: ['', Validators.required],
    });
  }

  cargarDatosFicticios(): void {
    const recursoFicticio = {
      nombre: 'Recurso de Prueba',
      descripcion: 'Descripción del recurso de prueba',
      tipoRecurso: 'Documento',
    };
    this.form.patchValue(recursoFicticio);
  }

  guardarRecurso(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datosFormulario = this.form.value;
    console.log('Datos enviados:', datosFormulario);

    this.router.navigate(['/recursos/list']);
  }
}
