import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-modal-peso-altura',
  standalone: true,
  imports: [
    FormsModule,MatButtonModule, MatDialogModule,MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './modal-peso-altura.component.html',
  styleUrls: ['./modal-peso-altura.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // O el que prefieras
})
export class ModalPesoAlturaComponent {
  peso: number | null = null;
  altura: number | null = null;

  constructor(private dialogRef: MatDialogRef<ModalPesoAlturaComponent>) {}

  onCerrar(): void {
    this.dialogRef.close();
  }

  registrar(): void {
    // Validar que ambos campos tengan un valor
    if (this.peso === null || this.altura === null) {
      console.warn('Por favor ingresa tanto el peso como la altura.');
      return;
    }

    // Aquí puedes manejar el registro del peso y altura
    console.log('Peso registrado:', this.peso);
    console.log('Altura registrada:', this.altura);
    
    // Lógica para enviar datos al backend o realizar otra acción

    // Cierra el modal después de registrar
    this.dialogRef.close();
  }
}
