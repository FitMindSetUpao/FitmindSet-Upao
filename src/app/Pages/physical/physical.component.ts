import { Component, TemplateRef, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { ImcService} from '../../Core/Service/imc.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-physical',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatInput
  ],
  templateUrl: './physical.component.html',
  styleUrl: './physical.component.scss',
  providers: [ImcService]
})
export class PhysicalComponent implements AfterViewInit{
  @ViewChild('imcDialog') imcDialog!: TemplateRef<any>;
  @ViewChild('weightInput') weightInput!: ElementRef<HTMLInputElement>;
  @ViewChild('heightInput') heightInput!: ElementRef<HTMLInputElement>;

  formIsValid = false;
  imcResultado: number | null = null;

  constructor(private imcService: ImcService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    // Inicializar la validación cuando los elementos están disponibles
    this.validateForm();
  }

  openModal() {
    this.dialog.open(this.imcDialog);
  }

  onInput(): void {
    this.validateForm();
  }

  validateForm(): void {
    const weightValue = this.weightInput.nativeElement.value;
    const heightValue = this.heightInput.nativeElement.value;

    // Verificación de valores mínimos requeridos
    this.formIsValid =
      !!weightValue &&
      !!heightValue &&
      parseFloat(weightValue) >= 0 &&
      parseFloat(heightValue) >= 0.01 &&
      /^-?\d+(\.\d{1,2})?$/.test(heightValue);
  }

  calcularIMC(): void {
    const peso = parseFloat(this.weightInput.nativeElement.value);
    const altura = parseFloat(this.heightInput.nativeElement.value);

    this.imcService.calcularIMC(peso, altura).subscribe({
      next: (resultado) => {
        this.imcResultado = resultado;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  get formattedIMC(): string {
    return this.imcResultado !== null ? this.imcResultado.toFixed(2) : '0.00';
  }
}
