import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  usuario: UsuarioDTO = {
    id: 0,
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaRegistro: '',
    activo: true,
    imagen: 'https://via.placeholder.com/150'
  };

  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.perfilService.getPerfil().subscribe((perfil) => {
      this.usuario = perfil;
    });
  }

  editarPerfil() {
    console.log("Editar perfil");
  }

  desactivarPerfil() {
    this.perfilService.deactivatePerfil().subscribe(() => {
      console.log("Perfil desactivado");
      this.usuario.activo = false;
    });
  }

  cambiarImagen() {
    console.log("Cambiar foto de perfil");
  }
}
