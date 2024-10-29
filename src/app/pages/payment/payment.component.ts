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
    // Establece la nueva opción de pago
    this.selectedPaymentOption.set(option);
    this.paymentForm.controls['paymentOption'].setValue(option);
  
    // Manejo condicional de controles según la opción seleccionada
    if (option === 'Tarjeta de Crédito') {
      if (!this.paymentForm.contains('cardNumber')) {
        this.paymentForm.addControl('cardNumber', this.fb.control('', Validators.required));
      }
      if (!this.paymentForm.contains('expirationDate')) {
        this.paymentForm.addControl('expirationDate', this.fb.control('', Validators.required));
      }
      if (!this.paymentForm.contains('cvv')) {
        this.paymentForm.addControl('cvv', this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]));
      }
      // Remover otros controles si existen
      this.paymentForm.removeControl('paypalAccount');
      this.paymentForm.removeControl('paypalPassword');
      this.paymentForm.removeControl('cci');
      this.paymentForm.removeControl('dynamicKey');
  
    } else if (option === 'PayPal') {
      if (!this.paymentForm.contains('paypalAccount')) {
        this.paymentForm.addControl('paypalAccount', this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]));
      }
      if (!this.paymentForm.contains('paypalPassword')) {
        this.paymentForm.addControl('paypalPassword', this.fb.control('', Validators.required));
      }
      // Remover otros controles si existen
      this.paymentForm.removeControl('cardNumber');
      this.paymentForm.removeControl('expirationDate');
      this.paymentForm.removeControl('cvv');
      this.paymentForm.removeControl('cci');
      this.paymentForm.removeControl('dynamicKey');
  
    } else if (option === 'Transferencia Bancaria') {
      if (!this.paymentForm.contains('cci')) {
        this.paymentForm.addControl('cci', this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]));
      }
      if (!this.paymentForm.contains('dynamicKey')) {
        this.paymentForm.addControl('dynamicKey', this.fb.control('', [Validators.required, Validators.maxLength(6)]));
      }
      // Remover otros controles si existen
      this.paymentForm.removeControl('cardNumber');
      this.paymentForm.removeControl('expirationDate');
      this.paymentForm.removeControl('cvv');
      this.paymentForm.removeControl('paypalAccount');
      this.paymentForm.removeControl('paypalPassword');
    }
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
