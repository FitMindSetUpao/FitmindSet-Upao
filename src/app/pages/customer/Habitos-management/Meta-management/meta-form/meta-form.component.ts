import { Component, inject, OnInit } from '@angular/core';
import { MetaService } from '../../../../../core/services/meta.services';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaDTO } from '../../../../../shared/models/meta.model';
import { MetaResponseDTO } from '../../../../../shared/models/meta-response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-meta-form',
  standalone: true,
  imports: [ 
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss'],
})
export class MetaFormComponent implements OnInit {

  habitoId?: number;
  metaId?: number;
  metas: any[] = []; 
  errors: string[] = []; 

    private fb = inject(FormBuilder);
    private metaService = inject(MetaService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private snackBar = inject(MatSnackBar);

    form: FormGroup = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['INICIADO', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      tiempoObjetivo: [0, [Validators.required]],
    });
  

  ngOnInit(): void {
    this.habitoId = Number(this.route.snapshot.paramMap.get('habitoId'));
    this.metaId = Number(this.route.snapshot.paramMap.get('metaId'));
    if (this.metaId) {
      this.cargarMeta();
    }
  }

  cargarMeta(): void {
    // Verificar si habitoId y metaId están definidos
    if (this.habitoId === undefined || this.metaId === undefined) {
      this.snackBar.open('ID de hábito o meta no definidos', 'Cerrar', { duration: 3000 });
      return;
    }
  
    this.metaService.obtenerMetasPorHabito(this.habitoId).subscribe(
      (metas) => {
        // Buscar la meta específica por su ID
        const meta = metas.find(meta => meta.id === this.metaId);
  
        if (meta) {
          // Si la meta existe, actualizar el formulario
          this.form.patchValue({
            descripcion: meta.descripcion,
            estado: meta.estado,
            fechaInicio: meta.fechaInicio,
            fechaFin: meta.fechaFin,
            tiempoObjetivo: meta.tiempoObjetivo,
          });
        } else {
          // Si no se encuentra la meta
          this.snackBar.open('Meta no encontrada', 'Cerrar', { duration: 3000 });
        }
      },
      (error) => {
        // Manejo de error en caso de que falle la petición
        this.snackBar.open('Error al cargar las metas', 'Cerrar', { duration: 3000 });
        console.error(error); // Puedes personalizar el manejo de errores si es necesario
      }
    );
  }
  
  

  guardarMeta(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    if (!this.habitoId || this.habitoId === 0) {
      this.snackBar.open('Hábito no válido', 'Cerrar', { duration: 3000 });
      return;
    }
  
    const metaDTO: MetaDTO = this.form.value;
    if (this.metaId) {
      // Update meta
      this.metaService
        .actualizarMeta(this.metaId, metaDTO)
        .subscribe(
          (meta: MetaResponseDTO) => {
            this.snackBar.open('Meta actualizada', 'Cerrar', { duration: 3000 });
            this.router.navigate([`/habito/${this.habitoId!}/metas`]);
          },
          (error) => {
            this.snackBar.open('Error al actualizar la meta', 'Cerrar', { duration: 3000 });
          }
        );
    } else {
      // Create new meta
      this.metaService
        .crearMeta(this.habitoId!, metaDTO)  // Ensure habitoId is not 0
        .subscribe(
          (meta: MetaResponseDTO) => {
            this.snackBar.open('Meta creada', 'Cerrar', { duration: 3000 });
            this.router.navigate([`/customer/habitos/list`]);
          },
          (error) => {
            this.snackBar.open('Error al crear la meta', 'Cerrar', { duration: 3000 });
          }
        );
    }
  }
  cancel() {
    this.router.navigate(['/customer/habitos/list']);
  }
  
  
  
}
