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
import { ChangeDetectorRef } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
    MatDatepickerModule,
    
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
  private cdr = inject(ChangeDetectorRef);

  tipoDeHabitos: TipoDeHabito[] = [];
  errors: string[] = [];
  habitoId?: number;
  loading = false;

  form: FormGroup = this.fb.group({
    tipoDeHabitoId: ['', [Validators.required]],  // Aquí estamos usando 'id' del tipo de hábito
    nombreHabito: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadTiposDeHabitos(); // Cargar tipos de hábitos

    if (!this.habitoId && this.tipoDeHabitos.length) {
      this.form.get('tipoDeHabitoId')?.setValue(this.tipoDeHabitos[0].id);
    }
    

    if (this.habitoId) {
      this.loadHabitosForEdit();
    }

    this.form.get('tipoDeHabitoId')?.valueChanges.subscribe(value => {
      console.log('Valor de tipoDeHabitoId:', value); 
    });
    if (this.habitoId) {
      this.loadHabitData(this.habitoId);
    }
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
          this.habitoId = +id;
          this.loadHabitData(this.habitoId);
      }
  });

  this.loadTiposDeHabitos();
  }
  loadHabitData(id: number): void {
    this.habitoService.getHabitosDetailsById(id).subscribe(
      (habit) => {
        this.form.patchValue({
          tipoDeHabitoId: habit.tipoDeHabitoId,
          nombreHabito: habit.nombreHabito,
          descripcion: habit.descripcion
        });
      },
      (error) => {
        console.error("Error al cargar el hábito", error);
      }
    );
  }

  private loadTiposDeHabitos(): void {
    this.tipoDeHabitoService.getAllTiposDeHabitos().subscribe({
        next: (tipoDeHabitos) => {
            if (!tipoDeHabitos || tipoDeHabitos.length === 0) {
                this.errors.push('No se encontraron tipos de hábitos');
                return;
            }
            this.tipoDeHabitos = tipoDeHabitos;
            console.log('Tipos de hábitos cargados:', this.tipoDeHabitos);

            // Solo asigna un valor por defecto si no estás en modo edición (sin `habitoId`)
            if (!this.habitoId && this.tipoDeHabitos.length) {
                this.form.get('tipoDeHabitoId')?.setValue(this.tipoDeHabitos[0].id);
            }
            this.cdr.detectChanges();
        },
        error: () => {
            this.errors.push('Error al cargar los tipos de hábitos');
        },
    });
    setTimeout(() => {
    if (!this.habitoId && this.tipoDeHabitos.length) {
        this.form.get('tipoDeHabitoId')?.setValue(this.tipoDeHabitos[0].id);
        console.log("Tipo de Hábito por defecto asignado:", this.tipoDeHabitos[0].id);
    }
}, 0);

}
  private loadHabitosForEdit(): void {
    if (!this.habitoId) return;

    this.habitoService.getHabitosDetailsById(this.habitoId).subscribe({
      next: (habitoData) => {
        this.form.patchValue({
          tipoDeHabitoId: habitoData.tipoDeHabitoId,  // Asegúrate de que se asigna el ID correcto
          nombreHabito: habitoData.nombreHabito,
          descripcion: habitoData.descripcion,
        });
        console.log('Datos de hábito para edición:', habitoData);
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
        tipoDeHabitoId: this.form.get('tipoDeHabitoId')?.value,
        customerId: this.authService.getUser()?.customerId,
    };

    console.log('Datos enviados:', formData);  // Ver los datos antes de enviarlos

    const request: Observable<HabitoResponse> = this.habitoId
        ? this.habitoService.updateHabito(this.habitoId, formData)
        : this.habitoService.createHabito(formData);

    request.subscribe({
        next: () => {
            this.snackBar.open('Hábito guardado exitosamente', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/customer/habitos/list']);
        },
        error: (error) => {
            console.error('Error al guardar el hábito:', error);
            this.errors = error.error.errors || ['Error al guardar el hábito'];
            this.snackBar.open('Error al guardar el hábito', 'Cerrar', { duration: 3000 });
        },
    });
}
cancel() {
  this.router.navigate(['/customer/habitos/list']);
}

}
