import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  comments: string[] = [];
  newComment: string = '';
  currentDate = new Date().toLocaleDateString();

  // Inyección del servicio
  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments();
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment);
      this.commentService.saveComments(this.comments); // Guardar en Local Storage usando el servicio
      this.newComment = '';
    }
  }

  loadComments() {
    this.comments = this.commentService.getComments(); // Cargar comentarios usando el servicio
  }
}