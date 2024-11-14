import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-actividad-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule ,
  ],
  templateUrl: './actividad-form.component.html',
  styleUrls: ['./actividad-form.component.scss']
})
export class ActividadFormComponent implements OnInit {
  form: FormGroup;
  metaId: number | null = null; // Inicializa metaId como null
  errors: string[] = [];
  seguimientoId: number | null = null;

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

    const seguimientoData = {
      metaId: this.metaId,  // Usa metaId de la URL
      tiempoInvertido: this.form.value.tiempoInvertido,
      observaciones: this.form.value.observaciones,
      estado: this.form.value.estado,
      porcentajeCumplido: 0,
      fecha: new Date().toISOString()
    };

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

  cancel(): void {
    this.router.navigate(['/seguimientos']);
  }
}
