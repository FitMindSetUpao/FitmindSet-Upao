// src/app/pages/forum.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  comments: string[] = [];
  newComment: string = '';
  currentDate = new Date().toLocaleDateString();

  ngOnInit() {
    this.loadComments();
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment);
      this.saveComments();  // Guardar en Local Storage
      this.newComment = '';
    }
  }

  // Método para cargar comentarios del Local Storage
  loadComments() {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
    }
  }

  // Método para guardar comentarios en Local Storage
  saveComments() {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }
}
