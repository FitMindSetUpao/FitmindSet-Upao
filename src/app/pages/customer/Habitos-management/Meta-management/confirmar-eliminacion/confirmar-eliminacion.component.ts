import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminacion',
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrls: ['./confirmar-eliminacion.component.scss']
})
export class ConfirmarEliminacionComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false); // Cierra el modal sin realizar la acción
  }

  confirmar(): void {
    this.dialogRef.close(true); // Cierra el modal y pasa el valor 'true'
  }
}
