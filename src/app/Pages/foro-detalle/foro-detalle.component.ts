import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DialogCreatePostComponent } from './dialog-create-post.component';

@Component({
  selector: 'app-foro-detalle',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './foro-detalle.component.html',
  styleUrls: ['./foro-detalle.component.scss']
})
export class ForoDetalleComponent {
  foroTitulo = 'Guía de Ejercicios';
  fechaCreacion = '16/10/2024';

  publicaciones = [
    {
      titulo: 'Primera Publicación',
      contenido: 'Contenido de la primera publicación.',
      autor: 'Juan Pérez',
      fecha: '20/10/2024'
    },
    {
      titulo: 'Segunda Publicación',
      contenido: 'Contenido de la segunda publicación.',
      autor: 'Ana Martínez',
      fecha: '21/10/2024'
    },
    {
      titulo: 'Tercera Publicación',
      contenido: 'Contenido de la tercera publicación.',
      autor: 'Carlos López',
      fecha: '22/10/2024'
    }
  ];

  constructor(public dialog: MatDialog) {}

  abrirModal() {
    const dialogRef = this.dialog.open(DialogCreatePostComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.publicaciones.unshift(result);  // Agrega la nueva publicación al inicio de la lista
      }
    });
  }
  unirse() {
    alert("Te has unido al foro.");
  }
}
