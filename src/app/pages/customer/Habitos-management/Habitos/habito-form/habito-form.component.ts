import { Component, inject, OnInit } from '@angular/core';
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
import { TipoDeHabito } from '../../../../../shared/models/tipo-de-habito.model';
import { Habito } from '../../../../../shared/models/habito.model';
import { HabitoResponse } from '../../../../../shared/models/habito-response.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';


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
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './habito-form.component.html',
  styleUrls: ['./habito-form.component.scss'],
})
export class HabitoFormComponent implements OnInit {
  private habitoService = inject(HabitoService);
  private tipoDeHabitoService = inject(TipoDeHabitoService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  tipoDeHabitos: TipoDeHabito[] = [];
  errors: string[] = [];
  habitoId?: number;
  loading = false;

  form: FormGroup = this.fb.group({
    tipoDeHabitoId: [null, [Validators.required]],
    nombre_habito: ['', [Validators.required]], // Cambia `nombre` a `nombre_habito`
    descripcion: ['', [Validators.required]],
  });
  

  ngOnInit(): void {
    this.habitoId = Number(this.route.snapshot.paramMap.get('tipoDeHabitos'));
    this.loadTiposDeHabitos();
    this.habitoId = Number(this.route.snapshot.paramMap.get('id'));
  
  if (this.habitoId) {
    this.habitoService.getHabitosDetailsById(this.habitoId).subscribe((habitoData) => {
   
      this.form.patchValue({
        tipoDeHabitoId: habitoData.tipoDeHabitoId,
        nombre_habito: habitoData.nombre_habito,
        descripcion: habitoData.descripcion
      });
    });
  }
}
  private loadTiposDeHabitos(): void {
    this.tipoDeHabitoService.getAllTiposDeHabitos().subscribe({
      next: (tipoDeHabitos) => {
        // Asigna un ID numérico a cada tipo de hábito, si no viene del backend.
        this.tipoDeHabitos = tipoDeHabitos.map((tipo, index) => ({
          ...tipo,
          id: index + 1, // Esto asigna un id único, empezando en 1.
        }));
  
        console.log('Tipos de hábitos con IDs:', this.tipoDeHabitos);
  
        this.loading = false;
  
        // Si deseas seleccionar el primero automáticamente al cargar
        if (!this.habitoId && this.tipoDeHabitos.length) {
          this.form.get('tipoDeHabitoId')?.setValue(this.tipoDeHabitos[0].id);
        }
      },
      error: () => {
        this.errors.push('Error al cargar los tipos de hábitos');
        this.loading = false;
      }
    });
  }
  private loadHabitosForEdit(): void {
    if (!this.tipoDeHabitos.length) return;
  
    this.habitoService.getHabitosDetailsById(this.habitoId!).subscribe({
      next: (habito: HabitoResponse) => {
        this.form.patchValue({
          nombre: habito.nombre_habito,
          descripcion: habito.descripcion,
          tipoDeHabitoId: habito.tipoDeHabitoId, 
        });
      },
      error: () => this.errors.push('Error al cargar los detalles del hábito.'),
    });
  }
  
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const nombre_habito = this.form.get('nombre')?.value;
    if (!nombre_habito) {
      this.snackBar.open('El nombre del hábito es obligatorio', 'Cerrar', { duration: 3000 });
      return;
    }
  
    const tipoDeHabitoId = Number(this.form.get('tipoDeHabitoId')?.value);
    if (isNaN(tipoDeHabitoId)) {
      this.snackBar.open('Tipo de hábito no válido', 'Cerrar', { duration: 3000 });
      return;
    }
  
    const formData: Habito = {
      ...this.form.value,
      nombre_Habito: nombre_habito,  
      tipoDeHabitoId: tipoDeHabitoId,
    };
  
    console.log("Datos enviados:", formData);
  
    const request: Observable<HabitoResponse> = this.habitoId
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
