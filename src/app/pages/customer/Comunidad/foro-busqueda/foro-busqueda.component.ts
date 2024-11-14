import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  styleUrls: ['./foro-busqueda.component.scss'] // <-- Corrección aquí: 'styleUrls' en plural
})
export class ForoBusquedaComponent {
  forums = [
    { title: 'Foro 1', description: 'Descripción del foro 1' },
    { title: 'Foro 2', description: 'Descripción del foro 2' },
    { title: 'Foro 3', description: 'Descripción del foro 3' },
    { title: 'Foro 4', description: 'Descripción del foro 4' }
  ];

  constructor(private router: Router) {}

  createForum() {
    // Redirige a foro/foro-cr (ForoCrearComponent)
    this.router.navigate(['/customer/foro/foro-cr']);
  }

  viewForumDetails(forumTitle: string) {
    // Redirige a foro/foro-co (ForoComentariosComponent) con un parámetro opcional si quieres pasar info
    this.router.navigate(['/customer/foro/foro-co'], {
      queryParams: { title: forumTitle }
    });
  }
}
