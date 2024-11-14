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
  esPropietario: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.foroActual = params['title'] || '';
    });

    const foroData = JSON.parse(localStorage.getItem('forums') || '[]').find((f: any) => f.title === this.foroActual);
    this.esPropietario = foroData?.creator === this.nombreUsuario;

    this.isJoined = JSON.parse(localStorage.getItem(`joined_${this.foroActual}`) || 'false');
    this.comments = JSON.parse(localStorage.getItem('comments') || '[]');
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
      localStorage.setItem('comments', JSON.stringify(this.comments));
    }
  }
}
