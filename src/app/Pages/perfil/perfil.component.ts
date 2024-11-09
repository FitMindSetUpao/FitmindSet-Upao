import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule],  // Asegúrate de incluir MatButtonModule si usas botones
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  usuario = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '+123456789',
    direccion: 'Av. Siempre Viva 123, Springfield',
    fechaRegistro: '01/01/2023',
    imagen: 'https://via.placeholder.com/150' // URL de imagen de ejemplo
  };

  editarPerfil() {
    console.log("Editar perfil");
  }

  eliminarPerfil() {
    console.log("Eliminar perfil");
  }

  cambiarImagen() {
    console.log("Cambiar foto de perfil");
    // Lógica para cambiar la foto de perfil
  }
}
