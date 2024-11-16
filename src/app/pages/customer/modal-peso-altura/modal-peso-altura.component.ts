import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modal-peso-altura',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [DecimalPipe],
  templateUrl: './modal-peso-altura.component.html',
  styleUrls: ['./modal-peso-altura.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ModalPesoAlturaComponent {
  peso: number | null = null;
  altura: number | null = null;
  imc: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<ModalPesoAlturaComponent>,
    private http: HttpClient,
    private decimalPipe: DecimalPipe
  ) {}

  onCerrar(): void {
    this.dialogRef.close();
  }

  calcularIMC(): void {
    if (this.peso && this.altura && this.peso > 0 && this.altura > 0) {
      const alturaEnMetros = this.altura / 100;
      const imcValue = this.peso / (alturaEnMetros * alturaEnMetros);
      this.imc = this.decimalPipe.transform(imcValue, '1.1-2'); 
    } else {
      this.imc = null; 
    }
  }

  registrar(form: NgForm): void {
    if (form.invalid) {
      console.warn('Por favor ingresa tanto el peso como la altura.');
      return;
    }

    const requestData = {
      peso: this.peso,
      altura: this.altura
    };

    this.http.post(`${environment.baseURL}/customer/registrarPesoAltura`, requestData, { responseType: 'text' }).subscribe(
      () => {
        console.log("Registro exitoso, cerrando modal");
        this.dialogRef.close();
      },
      (error) => {
        console.error("Error al registrar peso y altura:", error);
      }
    );
  }
}
