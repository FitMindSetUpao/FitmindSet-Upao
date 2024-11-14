import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';

@Component({
  selector: 'app-seguimiento-form',
  templateUrl: './seguimiento-form.component.html',
  styleUrls: ['./seguimiento-form.component.scss']
})
export class SeguimientoFormComponent implements OnInit {
  form: FormGroup;
  seguimientoId: number | null = null;
  metaId: number = 2;  // Esto sería dinámico, dependiendo de la meta seleccionada
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      tiempoInvertido: ['', Validators.required],
      observaciones: ['', Validators.required]
    });

    // Si estamos editando un seguimiento, obtenemos el ID desde la URL
    this.route.params.subscribe(params => {
      this.seguimientoId = params['id'] ? +params['id'] : null;
      if (this.seguimientoId) {
        this.loadSeguimientoData();
      }
    });
  }

  loadSeguimientoData(): void {
    // Cargar los datos del seguimiento desde el servicio (esto dependerá de cómo se haga la obtención de datos)
    this.seguimientoService.getSeguimiento(this.seguimientoId!).subscribe(data => {
      this.form.patchValue(data);  // Rellenar el formulario con los datos obtenidos
    });
  }

  guardarSeguimiento(): void {
    if (this.form.invalid) {
      this.errors = ['Todos los campos son obligatorios.'];
      return;
    }

    const seguimientoData = {
      metaId: this.metaId,
      tiempoInvertido: this.form.value.tiempoInvertido,
      observaciones: this.form.value.observaciones,
      estado: this.form.value.estado
    };

    if (this.seguimientoId) {
      // Si estamos editando, hacemos una actualización
      this.seguimientoService.actualizarSeguimiento(this.seguimientoId, seguimientoData).subscribe(
        (response) => {
          this.snackBar.open('Seguimiento actualizado con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/seguimientos']);
        },
        (error) => {
          this.snackBar.open('Error al actualizar seguimiento', 'Cerrar', { duration: 3000 });
          console.error(error);
        }
      );
    } else {
      // Si estamos registrando un nuevo seguimiento
      this.seguimientoService.registrarSeguimiento(seguimientoData).subscribe(
        (response) => {
          this.snackBar.open('Seguimiento registrado con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/seguimientos']);
        },
        (error) => {
          this.snackBar.open('Error al registrar seguimiento', 'Cerrar', { duration: 3000 });
          console.error(error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/seguimientos']);
  }
}
