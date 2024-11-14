import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  styleUrl: './foro-comentarios.component.scss'
})
export class ForoComentariosComponent {
  isJoined: boolean = false;
  comments: string[] = [];

  joinForum() {
    this.isJoined = true;
  }

  addComment(comment: string) {
    if (comment) {
      this.comments.push(comment);
    }
  }
}
