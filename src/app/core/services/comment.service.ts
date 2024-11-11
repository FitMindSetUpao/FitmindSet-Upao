import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private storageKey = 'comments';

  getComments(): string[] {
    const savedComments = localStorage.getItem(this.storageKey);
    return savedComments ? JSON.parse(savedComments) : [];
  }

  saveComments(comments: string[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(comments));
  }
}