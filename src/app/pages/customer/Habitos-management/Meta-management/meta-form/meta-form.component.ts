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
    tiempoObjetivo: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.habitoId = Number(this.route.snapshot.paramMap.get('habitoId'));
    this.metaId = Number(this.route.snapshot.paramMap.get('metaId'));
    
    if (this.metaId) {
      this.cargarMeta();
    }
  }
  

  cargarMeta(): void {
    if (!this.metaId) {
      this.snackBar.open('ID de meta no válido', 'Cerrar', { duration: 3000 });
      return;
    }

    this.metaService.getMetaById(this.metaId.toString()).subscribe(
      (meta) => {
        console.log('Meta cargada:', meta);
        if (meta) {
          this.form.patchValue({
            descripcion: meta.descripcion,
            estado: meta.estado,
            fechaInicio: meta.fechaInicio,
            fechaFin: meta.fechaFin,
            tiempoObjetivo: meta.tiempoObjetivo,
          });
        } else {
          this.snackBar.open('Meta no encontrada', 'Cerrar', { duration: 3000 });
        }
      },
      (error) => {
        this.snackBar.open('Error al cargar la meta', 'Cerrar', { duration: 3000 });
        console.error(error);
      }
    );
  }
  guardarMeta(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Formulario inválido');
      return;
    }
    if (!this.habitoId) {
      this.snackBar.open('Hábito no válido', 'Cerrar', { duration: 3000 });
      return;
    }
    const metaDTO: MetaDTO = {
      ...this.form.value,
      habitoId: this.habitoId
   };
    console.log("MetaDTO a guardar:", metaDTO);
    if (this.metaId) {
      console.log("Actualizando meta con ID:", this.metaId);
      this.metaService.actualizarMeta(this.metaId, metaDTO).subscribe(
        (meta: MetaResponseDTO) => {
          console.log("Meta actualizada:", meta);
          this.snackBar.open('Meta actualizada', 'Cerrar', { duration: 3000 });
          this.router.navigate([`/customer/habitos/metas/${this.habitoId}`]);
        },
        (error) => {
          console.error("Error al actualizar la meta:", error);
          this.snackBar.open('Error al actualizar la meta', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      console.log("Creando nueva meta...");
      this.metaService.crearMeta(this.habitoId, metaDTO).subscribe(
        (meta: MetaResponseDTO) => {
          this.snackBar.open('Meta creada', 'Cerrar', { duration: 3000 });
          this.router.navigate([`/customer/habitos/list`]);
        },
        (error) => {
          console.error("Error al crear la meta:", error);
          this.snackBar.open('Error al crear la meta', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
  cancel() {
    this.router.navigate(['/customer/habitos/metas']);
  }
}