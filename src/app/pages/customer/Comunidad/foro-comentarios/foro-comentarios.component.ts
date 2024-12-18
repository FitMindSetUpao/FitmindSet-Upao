import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

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
  comments: Array<{ 
    user: string; 
    comment: string; 
    replies?: Array<{ user: string; comment: string }> 
  }> = [];
  usuarioActual: string = '';
  foroActual: string = '';
  foroDescripcion: string = '';
  esPropietario: boolean = false;

  private authService = inject(AuthService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el usuario actual
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';

    // Recuperar título del foro desde los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.foroActual = params['title'] || '';
    });

    // Buscar el foro en la lista global
    const foroData = JSON.parse(localStorage.getItem('forums_global') || '[]').find((f: any) => f.title === this.foroActual);
    if (foroData) {
      this.foroDescripcion = foroData.description;
      this.esPropietario = foroData.creator === this.usuarioActual;
    }

    // Comprobar si el usuario está unido al foro
    this.isJoined = JSON.parse(localStorage.getItem(`joined_${this.usuarioActual}_${this.foroActual}`) || 'false');

    // Cargar comentarios (solo si el usuario está unido)
    if (this.isJoined) {
      this.comments = JSON.parse(localStorage.getItem(`comments_${this.foroActual}`) || '[]');
    }
  }

  toggleJoin() {
    if (!this.esPropietario) {
      this.isJoined = !this.isJoined;
      localStorage.setItem(`joined_${this.usuarioActual}_${this.foroActual}`, JSON.stringify(this.isJoined));

      // Recargar comentarios si el usuario se une
      if (this.isJoined) {
        this.comments = JSON.parse(localStorage.getItem(`comments_${this.foroActual}`) || '[]');
      } else {
        this.comments = [];
      }
    }
  }

  addComment(comment: string) {
    if (comment) {
      const newComment = { user: this.usuarioActual, comment, replies: [] };
      this.comments.push(newComment);
      localStorage.setItem(`comments_${this.foroActual}`, JSON.stringify(this.comments));
    }
  }

  addReply(commentIndex: number, reply: string) {
    if (reply) {
      const newReply = { user: this.usuarioActual, comment: reply };
      this.comments[commentIndex].replies = this.comments[commentIndex].replies || [];
      this.comments[commentIndex].replies?.push(newReply);
      localStorage.setItem(`comments_${this.foroActual}`, JSON.stringify(this.comments));
    }
  }
}
