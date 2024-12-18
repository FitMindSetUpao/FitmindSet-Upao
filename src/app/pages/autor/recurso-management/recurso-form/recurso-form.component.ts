import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { RecursoService } from '../../../../core/services/recurso.service';
import { TipoDeHabitoService } from '../../../../core/services/tipo-de-habito.services';
import { AuthService } from '../../../../core/services/auth.service';
import { MediaService } from '../../../../core/services/media.service';
import { tipoDeRecursoResponse } from '../../../../shared/models/tipoDeRecurso.model';
import { RecursoResponse } from '../../../../shared/models/recurso-response.model';
import { Recurso } from '../../../../shared/models/recurso.model';
import { TipoDeHabito } from '../../../../shared/models/tipo-de-habito.model';
import { CommonModule } from '@angular/common'; 
import { planService } from '../../../../core/services/planes.service';
import { TiposSuscripcion } from '../../../../shared/models/tiposSuscripcion.model';

@Component({
  selector: 'app-recurso-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ApiImgPipe,
    CommonModule,
  ],
  templateUrl: './recurso-form.component.html',
  styleUrl: './recurso-form.component.scss'
})
export class RecursoFormComponent implements OnInit {
  private recursoService = inject(RecursoService);
  private mediaService = inject(MediaService);
  private tipoDeHabitoService = inject(TipoDeHabitoService);
  private authService = inject(AuthService);
  private planService = inject(planService);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  planes: Array<{ id: number, nombre: string }> = [];

  tiporecursos: tipoDeRecursoResponse[] = [];
  tipoDeHabitos: TipoDeHabito[] = [];
  tiposSuscripcion: string[] = []; 

  recursoid?: number;
  errors: string[] = [];

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
    descripcion: ['', [Validators.required]],
    precio: [0, [Validators.required, Validators.min(0)]],
    coverPath: ['', [Validators.required]], // Asegúrate de que esta validación se aplica correctamente
    filePath: ['', [Validators.required]],  // Asegúrate de que esta validación se aplica correctamente
    tiporecurso: ['', Validators.required],
    tipoDeHabitosId: ['', Validators.required],
    plan_id: [null, Validators.required],
  });
    ngOnInit(): void {
    this.recursoid = Number(this.route.snapshot.paramMap.get('id'));
    this.loadtipoDeHabito();
    this.loadTipoDeRecurso();
    this.loadTiposSuscripcion();
  }
  private loadtipoDeHabito(): void {
    this.tipoDeHabitoService.getAllTiposDeHabitos().subscribe({
      next: (tipoDeHabitos) => {
        this.tipoDeHabitos = tipoDeHabitos;
        if (this.recursoid) this.loadRecursosForActualizar();
      },
      error: () => this.errors.push('Error al cargar los tipos de hábitos.'),
    });
  }
  private loadTipoDeRecurso(): void {
    this.tipoDeHabitoService.getAllTiposDeRecurso().subscribe({
      next: (tiposDeRecurso) => {
        this.tiporecursos = tiposDeRecurso;
        if (this.recursoid) this.loadRecursosForActualizar();
      },
      error: () => this.errors.push('Error al cargar los tipos de recursos.')
    });
  }
  loadTiposSuscripcion() {
    this.tipoDeHabitoService.getAllTiposSuscripcion().subscribe(
      (data: TiposSuscripcion[]) => {
        // Extraemos solo los nombres para usar en el formulario
        this.tiposSuscripcion = data.map(tipo => tipo.nombre);
      },
      (error) => {
        console.error('Error loading tipos de suscripción:', error);
      }
    );
  }
  
  
  private loadRecursosForActualizar(): void {
    this.recursoService.getRecursoDetailsById(this.recursoid!).subscribe({
      next: (recurso: RecursoResponse) => {
        const tipoDeHabito = this.tipoDeHabitos.find(
          (habito) => habito.nombre === recurso.tipoDeHabito 
        );
        this.form.patchValue({
          ...recurso,
          tiporecurso: recurso.recursoId,  
          tipoDeHabitosId: tipoDeHabito ? tipoDeHabito.id : null, 
        });
      },
      error: () => this.errors.push('Error al cargar los detalles del Recurso.'),
    });
  }
  
  uploadFile(event: Event, control: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      this.showSnackBar('No se seleccionó ningún archivo.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    this.mediaService.upload(formData).subscribe({
      next: (response) => {
        this.form.controls[control].setValue(response.path);
        this.showSnackBar('Archivo cargado exitosamente.');
      },
      error: () => this.showSnackBar('Error al cargar el archivo.'),
    });
  }
  private showSnackBar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, { duration: 3000 });
  }
  
  
  
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: Recurso = {
      ...this.form.value,
      authorId: this.authService.getUser()?.autorId
    };

    const request: Observable<RecursoResponse> = this.recursoid
      ? this.recursoService.updateRecurso(this.recursoid, formData)
      : this.recursoService.createRecursos(formData);

    request.subscribe({
      next: () => {
        this.snackBar.open('Recurso guardado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/autor/recursos/list']);
      },
      error: (error) => {
        this.errors = error.error.errors || ['Error al guardar el Recurso'];
        this.snackBar.open('Error al guardar el recurso', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
