import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HabitoService } from '../../../../../core/services/habito.services';
import { TipoDeHabitoService } from '../../../../../core/services/tipo-de-habito.services';
import { AuthService } from '../../../../../core/services/auth.service';
import { tipoDeHabitos } from '../../../../../shared/models/tipoDeHabito-response.model';  // Cambié a TipoDeHabito con mayúscula
import { Habito } from '../../../../../shared/models/habito.model';
import { HabitoResponse } from '../../../../../shared/models/habito-response.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-habito-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './habito-form.component.html',
  styleUrls: ['./habito-form.component.scss'],
})
export class HabitoFormComponent {
  private habitoService = inject(HabitoService);
  private tipoDeHabitoService = inject(TipoDeHabitoService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  tipoDeHabitos: tipoDeHabitos[] = [];  // Cambié el tipo a TipoDeHabito
  errors: string[] = [];
  habitoId?: number;
  loading = false;  // Para controlar la carga de datos

  form: FormGroup = this.fb.group({
    tipoDeHabitoId: ['', Validators.required],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.habitoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTiposDeHabitos();
  }

  private loadTiposDeHabitos(): void {
    this.loading = true;  // Activar el estado de carga
    this.tipoDeHabitoService.getAllTiposDeHabitos().subscribe({
      next: (tipoDeHabitos) => {
        this.tipoDeHabitos = tipoDeHabitos;
        if (this.habitoId) this.loadHabitosForEdit();
        this.loading = false;  // Desactivar el estado de carga
      },
      error: () => {
        this.errors.push('Error al cargar los tipos de hábitos');
        this.loading = false;
      },
    });
  }

  private loadHabitosForEdit(): void {
    this.habitoService.getHabitosDetailsById(this.habitoId!).subscribe({
      next: (habito: HabitoResponse) => {
        const tipoDeHabito = this.tipoDeHabitos.find(
          (cat) => cat.nombre === habito.tipoDeHabitoNombre
        );
        if (tipoDeHabito) {
          this.form.patchValue({
            ...habito,
            tipoDeHabitoId: tipoDeHabito.id,
          });
        }
      },
      error: () => this.errors.push('Error al cargar los detalles del hábito.'),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData: Habito = {
      ...this.form.value,
      customerId: this.authService.getUser()?.customerId,
    };
    const request: Observable<Habito> = this.habitoId
      ? this.habitoService.updateHabito(this.habitoId, formData)
      : this.habitoService.createHabito(formData);
    request.subscribe({
      next: () => {
        this.snackBar.open('Hábito guardado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/customer/habitos/list']);
      },
      error: (error) => {
        this.errors = error.error.errors || ['Error al guardar el hábito'];
        this.snackBar.open('Error al guardar el hábito', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
