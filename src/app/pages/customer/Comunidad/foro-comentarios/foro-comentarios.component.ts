import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service'; // Asegúrate de importar AuthService correctamente

@Component({
  selector: 'app-foro-comentarios',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './foro-comentarios.component.html',
  styleUrls: ['./foro-comentarios.component.scss']
})
export class ForoComentariosComponent implements OnInit {
  isJoined: boolean = false;
  comments: Array<{ user: string, comment: string }> = [];
  nombreUsuario: string | null = '';  // Cambia tipo a string | null
  foroActual: string = '';
  foroDescripcion: string = '';
  esPropietario: boolean = false;

  // Inyectamos el AuthService para obtener el nombre del usuario autenticado
  private authService = inject(AuthService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.nombreUsuario = this.authService.getUser()?.nombre || 'UsuarioDemo';  // Actualizamos el nombre del usuario

    // Recuperamos los datos del foro actual
    this.route.queryParams.subscribe(params => {
      this.foroActual = params['title'] || '';
    });

    const foroData = JSON.parse(localStorage.getItem('forums') || '[]').find((f: any) => f.title === this.foroActual);
    if (foroData) {
      this.foroDescripcion = foroData.description;
      this.esPropietario = foroData.creator === this.nombreUsuario;
    }

    // Verificamos si el usuario ya está unido al foro actual
    this.isJoined = JSON.parse(localStorage.getItem(`joined_${this.foroActual}`) || 'false');

    // Cargar comentarios específicos del foro actual
    this.comments = JSON.parse(localStorage.getItem(`comments_${this.foroActual}`) || '[]');
  }

  toggleJoin() {
    if (!this.esPropietario) {
      this.isJoined = !this.isJoined;
      localStorage.setItem(`joined_${this.foroActual}`, JSON.stringify(this.isJoined));
    }
  }

  addComment(comment: string) {
    if (comment) {
      // Usamos el nombre del usuario autenticado en el comentario
      const newComment = { user: this.nombreUsuario || 'Anonimo', comment };
      this.comments.push(newComment);

      // Guardar comentarios específicos del foro actual en localStorage
      localStorage.setItem(`comments_${this.foroActual}`, JSON.stringify(this.comments));
    }
  }
}