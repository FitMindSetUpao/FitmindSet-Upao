// src/app/pages/payment.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  selectedPaymentOption = signal<string | null>(null); // Declaración corregida
  paymentOptions = ['Tarjeta de Crédito', 'PayPal', 'Transferencia Bancaria'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializar el formulario de pago con validaciones
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      paymentOption: [null, Validators.required]
    });
  }

  // Selección de opción de pago y muestra del formulario
  selectPaymentOption(option: string) {
    this.selectedPaymentOption.set(option); // Ahora esto funcionará
    this.paymentForm.controls['paymentOption'].setValue(option);
  }

  // Método para procesar el pago
  processPayment() {
    if (this.paymentForm.valid) {
      alert(`Pago realizado con éxito mediante ${this.selectedPaymentOption()}`);
      this.paymentForm.reset();
      this.selectedPaymentOption.set(null); // Esto también funcionará ahora
    } else {
      alert('Por favor completa el formulario correctamente.');
    }
  }
}
