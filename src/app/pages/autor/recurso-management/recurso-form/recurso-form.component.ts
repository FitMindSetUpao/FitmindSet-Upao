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
import { tiposSuscripcion } from '../../../../shared/models/tiposSuscripcion.model';

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
  tiposSuscripcion: tiposSuscripcion[] = [];
  previewImage: string | ArrayBuffer | null | undefined = null;
  recursoid?: number;
  errors: string[] = [];

  form: FormGroup = this.fb.group({
    nombreRecurso: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
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
    console.log('ID del recurso:', this.recursoid);

    // Cargar datos iniciales
    this.loadtipoDeHabito();
    this.loadTipoDeRecurso();
    this.loadTiposSuscripcion();

    // Cargar recurso en caso de edición
    if (this.recursoid) {
      this.loadRecursosForActualizar();
    }
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
    this.tipoDeHabitoService.getAllTiposSuscripcion().subscribe({
      next: (data: tiposSuscripcion[]) => {
        this.tiposSuscripcion = data; // Ahora el tipo de dato coincide con la respuesta
      },
      error: (error) => {
        console.error('Error loading tipos de suscripción:', error);
      },
    });
  }


  private loadRecursosForActualizar(): void {
    if (!this.recursoid) {
      this.errors.push('ID de recurso no válido.');
      return;
    }

    this.recursoService.getRecursoDetailsById(this.recursoid).subscribe({
      next: (recurso: RecursoResponse) => {
        console.log('Recurso cargado:', recurso);
        this.form.patchValue({
          nombreRecurso: recurso.nombreRecurso,
          descripcion: recurso.descripcionRecurso,
          precio: recurso.precioRecurso,
          tiporecurso: recurso.tipoRecurso,
          tipoDeHabitosId: recurso.tipoDeHabitoId,
          plan_id: recurso.planId,
        });
      },
      error: (err) => {
        console.error('Error al cargar los detalles del recurso:', err);
        this.errors.push('Error al cargar los detalles del recurso.');
      },
    });
  }

  uploadFile(event: Event, control: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log(`${control} cargado:`, file.name);
      this.form.controls[control].setValue(file);

      if (control === 'coverPath') {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      console.error(`${control} no seleccionado.`);
    }
  }

  private showSnackBar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, { duration: 3000 });
  }

  goToRecursosList(): void {
    this.router.navigate(['/author/recursos/list']);
  }

  save(): void {
    // Validar formulario
    if (this.form.invalid) {
      this.errors = ['Por favor, completa todos los campos obligatorios.'];
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValue = this.form.value;

    // Agregar valores al FormData
    formData.append('nombreRecurso', formValue.nombreRecurso);
    formData.append('descripcionRecurso', formValue.descripcion);
    formData.append('precioRecurso', formValue.precio.toString());
    formData.append('tipoRecurso', formValue.tiporecurso.toUpperCase());
    formData.append('tipoDeHabitoId', formValue.tipoDeHabitosId.toString());
    formData.append('planId', formValue.plan_id.toString());

    // Agregar archivos opcionales si existen y son válidos
    if (formValue.coverPath && formValue.coverPath instanceof File) {
      formData.append('coverPath', formValue.coverPath);
    }
    if (formValue.filePath && formValue.filePath instanceof File) {
      formData.append('filePath', formValue.filePath);
    }

    // Verificar FormData en consola (para depuración, eliminar en producción)
    console.log('FormData enviado:');
    formData.forEach((value, key) => console.log(key, value));

    // Determinar si es una creación o actualización
    const request = this.recursoid
      ? this.recursoService.updateRecurso(this.recursoid, formData)
      : this.recursoService.createRecursos(formData);

    // Llamar al servicio y manejar la respuesta
    request.subscribe({
      next: () => {
        const message = this.recursoid
          ? 'Recurso actualizado exitosamente.'
          : 'Recurso creado exitosamente.';
        this.showSnackBar(message);
        this.router.navigate(['/author/recursos/list']);
      },
      error: (error) => {
        console.error('Error desde el servidor:', error);

        // Manejo genérico de errores
        if (error.error?.error) {
          this.errors = [error.error.error]; // Si el backend devuelve un mensaje de error específico
        } else if (error.error?.errors) {
          this.errors = error.error.errors; // Si el backend devuelve un array de errores
        } else {
          this.errors = ['Error inesperado al guardar el recurso.'];
        }

        this.showSnackBar('Error al guardar el recurso.');
      },
    });
  }

  downloadFile(filename: string): void {
    if (!filename) {
      this.showSnackBar('El archivo no está disponible para descargar.');
      return;
    }

    this.mediaService.getMedia(filename).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob); // Crear una URL temporal
        const a = document.createElement('a'); // Crear un elemento de enlace
        a.href = url;
        a.download = filename; // Establecer el nombre del archivo
        document.body.appendChild(a);
        a.click(); // Simular el clic para descargar
        document.body.removeChild(a); // Eliminar el enlace temporal
      },
      error: () => {
        this.showSnackBar('Error al descargar el archivo.');
      },
    });
  }

}
