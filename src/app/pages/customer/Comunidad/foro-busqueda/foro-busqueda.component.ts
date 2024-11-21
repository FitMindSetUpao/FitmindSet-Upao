import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-foro-busqueda',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './foro-busqueda.component.html',
  styleUrls: ['./foro-busqueda.component.scss']
})
export class ForoBusquedaComponent implements OnInit {
  forums: Array<{ title: string, description: string, creator: string, status: string }> = [];
  usuarioActual: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';

    // Recuperar foros globales y personalizados
    const globalForums = JSON.parse(localStorage.getItem('forums_global') || '[]');
    const userForums = JSON.parse(localStorage.getItem(`forums_${this.usuarioActual}`) || '[]');

    // Combinar foros sin duplicados
    const combinedForums = [...globalForums, ...userForums];
    this.forums = combinedForums.filter((forum, index, self) =>
      index === self.findIndex((f) => f.title === forum.title)
    );

    // Determinar estado para cada foro
    this.forums.forEach(forum => {
      if (forum.creator === this.usuarioActual) {
        forum.status = 'Propietario';
      } else if (JSON.parse(localStorage.getItem(`joined_${this.usuarioActual}_${forum.title}`) || 'false')) {
        forum.status = 'Unido';
      } else {
        forum.status = 'Desconocido';
      }
    });
  }

  createForum() {
    this.router.navigate(['/customer/foro/foro-cr']);
  }

  viewForumDetails(forumTitle: string) {
    this.router.navigate(['/customer/foro/foro-co'], {
      queryParams: { title: forumTitle }
    });
  }

  deleteForum(forumTitle: string) {
    // Confirmación para eliminar
    if (!confirm(`¿Estás seguro de que deseas eliminar el foro "${forumTitle}"?`)) {
      return;
    }

    // Eliminar de la lista específica del usuario
    const userForums = JSON.parse(localStorage.getItem(`forums_${this.usuarioActual}`) || '[]');
    const updatedUserForums = userForums.filter((forum: any) => forum.title !== forumTitle);
    localStorage.setItem(`forums_${this.usuarioActual}`, JSON.stringify(updatedUserForums));

    // Eliminar de la lista global
    const globalForums = JSON.parse(localStorage.getItem('forums_global') || '[]');
    const updatedGlobalForums = globalForums.filter((forum: any) => forum.title !== forumTitle);
    localStorage.setItem('forums_global', JSON.stringify(updatedGlobalForums));

    // Actualizar la vista
    this.ngOnInit();

    alert(`El foro "${forumTitle}" ha sido eliminado.`);
  }
}
