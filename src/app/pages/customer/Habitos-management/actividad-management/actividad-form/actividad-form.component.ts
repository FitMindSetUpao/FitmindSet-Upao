import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';
import { SeguimientoDTO } from '../../../../../shared/models/seguimiento.model';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

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
  metaId: number | null = null;
  errors: string[] = [];
  seguimientoId: number | null = null; 
  SeguimientoDTO: [] = [];

  constructor(
    private fb: FormBuilder,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute 
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

    if (this.metaId === null || this.metaId === undefined) {
      this.errors = ['metaId es obligatorio y no puede ser nulo'];
      return;
    }

    const seguimientoDTO: SeguimientoDTO = {
      ...this.form.value,
      id: this.seguimientoId ?? 0,
      metaId: this.metaId,
      tiempoInvertido: this.form.value.tiempoInvertido,
      observaciones: this.form.value.observaciones,
      estado: this.form.value.estado,
      porcentajeCumplido: 0,
      fecha: new Date().toISOString()
    };

    const observable = this.seguimientoId
      ? this.seguimientoService.actualizarSeguimientoPorMetaId(this.seguimientoId, seguimientoDTO)
      : this.seguimientoService.registrarSeguimiento(seguimientoDTO, this.metaId);

    observable.subscribe(
      (response: SeguimientoDTO) => {  // Typing the response
        this.snackBar.open('Seguimiento ' + (this.seguimientoId ? 'actualizado' : 'registrado') + ' con éxito', 'Cerrar', { duration: 3000 });
        console.log('Redirigiendo a la actividad');
        this.router.navigate(['customer/habitos/actividad']);
      },
      (error: HttpErrorResponse) => {  // Typing the error
        const errorMessage = error?.error?.message || 'Error al registrar seguimiento';
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
        console.error(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['customer/habitos/metas']);
  }
}
