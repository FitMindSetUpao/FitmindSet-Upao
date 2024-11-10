import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PerfilService } from '../../Core/Services/perfil.service';
import { UsuarioDTO } from '../../Shared/Components/Models/usuario.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
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
