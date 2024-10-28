import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  user = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: ''
  };
  confirmarContrasena = '';

  get passwordsMatch(): boolean {
    return this.user.contrasena === this.confirmarContrasena;
  }

  onSubmit() {
    if (this.passwordsMatch) {
      console.log('Usuario registrado:', this.user);
      alert('Registro exitoso!');
      // Aquí iría la lógica adicional para enviar los datos al servidor.
    } else {
      console.error('Las contraseñas no coinciden');
      alert('Las contraseñas no coinciden');
    }
  }
}
