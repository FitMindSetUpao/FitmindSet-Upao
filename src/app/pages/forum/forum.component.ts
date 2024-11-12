import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommentService } from '../../core/services/comment.service';
import { Comentario } from '../../shared/models/comentario.model';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  comments: Comentario[] = [];
  newComment: string = '';
  currentDate = new Date().toLocaleDateString();

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments(1); // Reemplaza el "1" con el ID del grupo actual si está disponible
  }

  addComment() {
    if (this.newComment.trim()) {
      const newComment: Comentario = {
        id: 0, // o null si el backend asigna el ID
        contenido: this.newComment,
        fechaPublicacion: new Date(),
        grupoId: 1, // Reemplaza con el grupoId actual
        customerId: 1, // Reemplaza con el customerId del usuario actual
      };

      this.commentService.crearComentario(newComment).subscribe({
        next: (comentarioCreado) => {
          this.comments.push(comentarioCreado);
          this.newComment = '';
        },
        error: (err) => console.error('Error al crear comentario', err),
      });
    }
  }

  loadComments(grupoId: number) {
    this.commentService.obtenerComentariosPorGrupo(grupoId).subscribe({
      next: (comentarios) => {
        this.comments = comentarios;
      },
      error: (err) => console.error('Error al cargar comentarios', err),
    });
  }
}