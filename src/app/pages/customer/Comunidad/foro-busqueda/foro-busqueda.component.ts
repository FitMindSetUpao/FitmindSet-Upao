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
    // Obtener el usuario autenticado
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';

    // Foros base
    const baseForums = [
      { title: 'Proteína', description: 'Crecen el músculo.', creator: '', status: 'Desconocido' },
      { title: 'Carbohidrato', description: 'Otorgan energía.', creator: '', status: 'Desconocido' },
      { title: 'Grasas Saludables', description: 'Mantienen la piel y cabello saludables.', creator: '', status: 'Desconocido' }
    ];

    // Recuperar foros personalizados del usuario actual
    const storedForums = JSON.parse(localStorage.getItem(`forums_${this.usuarioActual}`) || '[]');
    const combinedForums = [...baseForums, ...storedForums];
    this.forums = combinedForums.filter((forum, index, self) =>
      index === self.findIndex((f) => f.title === forum.title)
    );

    // Asignar estado del foro por usuario
    this.forums.forEach(forum => {
      if (forum.creator === this.usuarioActual) {
        forum.status = 'Propietario';
      } else if (JSON.parse(localStorage.getItem(`joined_${this.usuarioActual}_${forum.title}`) || 'false')) {
        forum.status = 'Unido';
      } else {
        forum.status = 'Desconocido';
      }
    });

    // Guardar en localStorage para persistencia
    localStorage.setItem(`forums_${this.usuarioActual}`, JSON.stringify(this.forums));
  }

  createForum() {
    this.router.navigate(['/customer/foro/foro-cr']);
  }

  viewForumDetails(forumTitle: string) {
    this.router.navigate(['/customer/foro/foro-co'], {
      queryParams: { title: forumTitle }
    });
  }
}
