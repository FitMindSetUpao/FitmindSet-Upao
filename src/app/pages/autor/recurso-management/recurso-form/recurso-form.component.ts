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
  ],
  templateUrl: './recurso-form.component.html',
  styleUrl: './recurso-form.component.scss'
})
export class RecursoFormComponent {
  private recursoService = inject(RecursoService);
  private mediaService = inject(MediaService);
  private tipoDeHabitoService = inject(TipoDeHabitoService);
  private authService = inject(AuthService);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  tiporecursos: tipoDeRecursoResponse[] = [];
  tipoDeHabitos: TipoDeHabito[] = [];

  recursoid?: number;
  errors: string[]=[];

  form: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(250)],
  ],
  descripcion: ['',[Validators.required]],
  precio: ['',[Validators.required, Validators.min(0)]],
  coverPath:['', Validators.required],
  filePath: ['', Validators.required],
  tiporecurso: ['', Validators.required],
   tipoDeHabitosId: ['', Validators.required],

  });
  ngOnInit(): void {
    this.recursoid = Number(this.route.snapshot.paramMap.get('id'));
    this.loadtipoDeHabito();
  }
  private loadtipoDeHabito(): void {
    this.tipoDeHabitoService.getAllTiposDeHabitos().subscribe({
      next: (tipoDeHabitos) => {
        this.tipoDeHabitos = tipoDeHabitos.map(habito => ({
          ...habito,
          id: habito.id
        }));
        if (this.recursoid) this.loadRecursosForActualizar();
      },
      error: () => this.errors.push('Error al cargar los tipos de hábitos.'),
    });
  }  
  private loadRecursosForActualizar(): void {
    this.recursoService.getRecursoDetailsById(this.recursoid!).subscribe({
      next: (recurso: RecursoResponse ) => {
        const category = this.tipoDeHabitos.find(
          (cat) => cat.nombre === recurso.tipoRecurso
        );
        if (category) {
          this.form.patchValue({
            ...recurso,
            tiporecursos: recurso.recursoid,
             tipoDeHabitos: recurso.tipoDeHabito,
          });
        }
      },
      error: () => this.errors.push('Error al cargar los detalles del Recurso.'),
    });
  }
  uploadFile(event: Event, control: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.mediaService.upload(formData).subscribe({
        next: (response) => this.form.controls[control].setValue(response.path),
        error: () => this.errors.push('Error al cargar el archivo.'),
      });
    }
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
