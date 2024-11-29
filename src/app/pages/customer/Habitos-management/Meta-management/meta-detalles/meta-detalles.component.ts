import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MetaResponseDTO } from '../../../../../shared/models/meta-response.model';
import { MetaService } from '../../../../../core/services/meta.services';
import { ConfirmarEliminacionComponent } from '../confirmar-eliminacion/confirmar-eliminacion.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-meta-detalles',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './meta-detalles.component.html',
  styleUrls: ['./meta-detalles.component.scss']
})
export class MetaDetallesComponent implements OnInit {
  metas: MetaResponseDTO[] = [];
  habitoId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private dialog: MatDialog // Inyectamos MatDialog para abrir el modal
  ) {
    this.habitoId = +this.route.snapshot.paramMap.get('habitoId')!;
  }

  ngOnInit(): void {
    this.obtenerMetas();
  }

  obtenerMetas(): void {
    this.metaService.obtenerMetasPorHabito(this.habitoId).subscribe({
      next: (metas) => this.metas = metas,
      error: () => console.error('Error al cargar las metas')
    });
  }

  actualizarMeta(metaId: number): void {
    this.router.navigate(['/customer/habitos/metas/editar', metaId]);
  }

  registrarActividad(metaId: number): void {
    this.router.navigate(['/customer/habitos/metas/actividad', metaId]);
  }

  // Método para abrir el modal de confirmación de eliminación
  abrirConfirmacionEliminar(metaId: number): void {
    const dialogRef = this.dialog.open(ConfirmarEliminacionComponent, {
      width: '400px',
      data: { metaId: metaId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarMeta(metaId); // Si el usuario confirma, se elimina la meta
      }
    });
  }

  // Método para eliminar la meta
  eliminarMeta(metaId: number): void {
    this.metaService.eliminarMeta(metaId).subscribe({
      next: () => {
        // Aquí puedes agregar una notificación de éxito o recargar las metas
        alert('Meta borrada con éxito');
        this.obtenerMetas(); // Recargamos las metas
      },
      error: () => {
        alert('Error al borrar la meta');
      }
    });
  }

  // Método para redirigir al formulario de creación de nueva meta
  crearMeta(): void {
    this.router.navigate(['/customer/habitos/metas/crear']);
  }
}
