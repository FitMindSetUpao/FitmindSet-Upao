import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  nombreUsuario: string = 'UsuarioDemo'; 
  foroActual: string = '';
  foroDescripcion: string = '';  // Nueva propiedad para la descripción
  esPropietario: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.foroActual = params['title'] || '';
    });

    // Obtenemos los detalles del foro actual, incluyendo su descripción
    const foroData = JSON.parse(localStorage.getItem('forums') || '[]').find((f: any) => f.title === this.foroActual);
    if (foroData) {
      this.foroDescripcion = foroData.description;  // Asignamos la descripción
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
      const newComment = { user: this.nombreUsuario, comment };
      this.comments.push(newComment);

      // Guardar comentarios específicos del foro actual en localStorage
      localStorage.setItem(`comments_${this.foroActual}`, JSON.stringify(this.comments));
    }
  }
}
