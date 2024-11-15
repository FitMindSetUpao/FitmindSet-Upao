import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./foro-busqueda.component.scss']
})
export class ForoBusquedaComponent implements OnInit {

  forums: Array<{ title: string, description: string, creator: string, status: string }> = [];
  usuarioActual: string = 'UsuarioDemo';

  constructor(private router: Router) {}

  ngOnInit() {
    // Definimos los foros base
    const baseForums = [
      { title: 'Proteína', description: 'Crecen el músculo.', creator: '', status: 'Desconocido' },
      { title: 'Carbohidrato', description: 'Otorgan energía.', creator: '', status: 'Desconocido' },
      { title: 'Grasas Saludables', description: 'Mantienen la piel y cabello saludables.', creator: '', status: 'Desconocido' }
    ];

    // Obtenemos foros guardados en localStorage
    const storedForums = JSON.parse(localStorage.getItem('forums') || '[]');

    // Combinamos los foros base con los guardados y eliminamos duplicados basados en el título
    const combinedForums = [...baseForums, ...storedForums];
    this.forums = combinedForums.filter((forum, index, self) =>
      index === self.findIndex((f) => f.title === forum.title)
    );

    // Actualizamos el estado de cada foro
    this.forums.forEach(forum => {
      if (forum.creator === this.usuarioActual) {
        forum.status = 'Propietario';
      } else if (JSON.parse(localStorage.getItem(`joined_${forum.title}`) || 'false')) {
        forum.status = 'Unido';
      } else {
        forum.status = 'Desconocido';
      }
    });

    // Guardamos en localStorage para asegurar que los foros base estén siempre presentes
    localStorage.setItem('forums', JSON.stringify(this.forums));
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