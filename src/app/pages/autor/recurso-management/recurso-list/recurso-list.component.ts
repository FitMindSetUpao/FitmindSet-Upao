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
export class RecursoListComponent implements OnInit {
  recursos: RecursoResponse[] = [];
  filteredRecursos: RecursoResponse[] = [];
  filterText = '';

  displayedColumns: string[] = [
    'cover',
    'nombreRecurso',
    'nombreAutor',
    'tipoDeHabito',
    'tipoDeRecurso',
    'precio',
    'actions',
  ];
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;
  
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
    fechaPublicacion: ['', Validators.required],
    autor: ['', Validators.required],
    estado: ['', Validators.required],
    descripcionExtendida: [''],
    plan_id: [null, Validators.required],
    etiquetas: ['']
  });
    ngOnInit(): void {
    this.recursoid = Number(this.route.snapshot.paramMap.get('id'));
    this.loadtipoDeHabito();
    this.loadTipoDeRecurso();
    this.loadTiposSuscripcion();
  }

  loadRecursos(pageIndex: number = 0, pageSize: number = 5): void {
    this.recursoService.paginateRecursos(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<RecursoResponse>) => {
        this.recursos = response.content;
        this.filteredRecursos = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      },
      error: () => this.showSnackBar('Error al cargar la lista de recursos'),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredRecursos = this.recursos.filter((recurso) =>
      recurso.nombreRecurso.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRecursos(this.pageIndex, this.pageSize);
  }

  createNewRecurso(): void {
    this.router.navigate(['/autor/recursos/crear']);
  }

  actualizarRecurso(recursoid: number): void {
    this.router.navigate(['/autor/recursos/edit', recursoid]);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,

    });
  }
}
