import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-create-post.component.html',
  styleUrls: ['./dialog-create-post.component.scss']
})
export class DialogCreatePostComponent {
  titulo = '';
  contenido = '';

  constructor(public dialogRef: MatDialogRef<DialogCreatePostComponent>) {}

  enviarPublicacion() {
    this.dialogRef.close({
      titulo: this.titulo,
      contenido: this.contenido,
      autor: 'Usuario Actual',
      fecha: new Date().toLocaleDateString()
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
