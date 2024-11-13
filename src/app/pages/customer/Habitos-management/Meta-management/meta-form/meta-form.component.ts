import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MetaService } from '../../../../../core/services/meta.services';
import { Meta } from '../../../../../shared/models/meta.model';  // Asegúrate de tener este modelo

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss'],
})
export class MetaFormComponent implements OnInit {
  private metaService = inject(MetaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  metaId?: number;
  errors: string[] = [];
  form: FormGroup = this.fb.group({
    descripcion: ['', [Validators.required]], 
    estado: ['INICIADO', [Validators.required]], 
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    tiempoObjetivo: ['', [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.metaId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.metaId) {
      this.loadMetaForEdit();
    }
  }

  private loadMetaForEdit(): void {
    this.metaService.getMetaById(this.metaId!).subscribe({
      next: (meta) => {
        this.form.patchValue({
          descripcion: meta.descripcion,
          estado: meta.estado,
          fechaInicio: meta.fechaInicio,
          fechaFin: meta.fechaFin,
          tiempoObjetivo: meta.tiempoObjetivo,
        });
      },
      error: () => this.errors.push('Error al cargar la meta para edición'),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: Meta = this.form.value;
    const request: Observable<Meta> = this.metaId
      ? this.metaService.updateMeta(this.metaId, formData)
      : this.metaService.createMeta(formData);

    request.subscribe({
      next: () => {
        this.snackBar.open('Meta guardada exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/customer/metas/list']);
      },
      error: (error) => {
        this.errors = error.error.errors || ['Error al guardar la meta'];
        this.snackBar.open('Error al guardar la meta', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
