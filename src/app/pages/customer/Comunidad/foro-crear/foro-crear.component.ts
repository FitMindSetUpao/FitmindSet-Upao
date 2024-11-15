import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foro-crear',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    RouterOutlet,
    CommonModule,
    FormsModule
  ],
  templateUrl: './foro-crear.component.html',
  styleUrls: ['./foro-crear.component.scss']
})
export class ForoCrearComponent {
  forumTitle: string = '';
  forumDescription: string = '';
  usuarioActual: string = 'UsuarioDemo';
  errorMessage: string = '';

  constructor(private router: Router) {}

  createForum() {
    if (!this.forumTitle || !this.forumDescription) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    const newForum = {
      title: this.forumTitle,
      description: this.forumDescription,
      creator: this.usuarioActual,
      status: 'Propietario'
    };

    // Guardar en localStorage
    const storedForums = JSON.parse(localStorage.getItem('forums') || '[]');
    storedForums.push(newForum);
    localStorage.setItem('forums', JSON.stringify(storedForums));

    // Notificación de éxito
    alert('El foro ha sido creado exitosamente.');

    // Redirigir a la lista de foros
    this.router.navigate(['/customer/foro/foro-busqueda']);
  }
}