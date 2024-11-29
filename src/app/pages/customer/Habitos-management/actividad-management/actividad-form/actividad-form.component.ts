import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SeguimientoDTO } from '../../../../../shared/models/seguimiento.model';

@Component({
  selector: 'app-actividad-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './actividad-form.component.html',
  styleUrls: ['./actividad-form.component.scss']
})
export class ActividadFormComponent implements OnInit {
  form: FormGroup;
  metaId: number | null = null; // Inicializa metaId como null
  errors: string[] = [];
  seguimientoId: number | null = null; 
  SeguimientoDTO: []=[];

  constructor(
    private fb: FormBuilder,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      tiempoInvertido: ['', [Validators.required, Validators.min(1)]],
      observaciones: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtén el metaId desde la URL
    this.route.paramMap.subscribe(params => {
      const metaIdParam = params.get('metaId');
      if (metaIdParam) {
        this.metaId = +metaIdParam;  // Convierte el parámetro de la URL a número
      } else {
        // Manejar el caso cuando metaId no esté presente en la URL
        console.error('metaId no encontrado en la URL');
      }
    });
  }
  

  guardarSeguimiento(): void {
    if (this.form.invalid) {
      this.errors = ['Todos los campos son obligatorios y deben ser válidos.'];
      return;
    }
  
    // Verifica si metaId está definido y es un número
    if (this.metaId === null || this.metaId === undefined) {
      this.errors = ['metaId es obligatorio y no puede ser nulo'];
      return;
    }
  
    // Crea el objeto SeguimientoDTO incluyendo seguimientoid y metaId
    const seguimientoDTO: SeguimientoDTO = {
      ...this.form.value,
     id: this.seguimientoId ?? 0,  // Si es nuevo, asignamos 0 o null según la lógica de tu aplicación
      metaId: this.metaId,  // Asegura que metaId esté presente
      tiempoInvertido: this.form.value.tiempoInvertido,
      observaciones: this.form.value.observaciones,
      estado: this.form.value.estado,
      porcentajeCumplido: 0,  // Lógica para calcular porcentaje si es necesario
      fecha: new Date().toISOString()
    };
  
    // Llamada al servicio para registrar o actualizar seguimiento
    const observable = this.seguimientoId
      ? this.seguimientoService.actualizarSeguimientoPorMetaId(this.seguimientoId, seguimientoDTO)
      : this.seguimientoService.registrarSeguimiento(seguimientoDTO, this.metaId);
  
    observable.subscribe(
      (response) => {
        this.snackBar.open('Seguimiento ' + (this.seguimientoId ? 'actualizado' : 'registrado') + ' con éxito', 'Cerrar', { duration: 3000 });
        console.log('Redirigiendo a la actividad');
        this.router.navigate(['customer/habitos/actividad']);
      },
      (error) => {
        const errorMessage = error?.error || 'Error al registrar seguimiento';
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
        console.error(error);
      }
    );
  }
  
  
  cancel(): void {
    this.router.navigate(['customer/habitos/metas',]);
  }
}
