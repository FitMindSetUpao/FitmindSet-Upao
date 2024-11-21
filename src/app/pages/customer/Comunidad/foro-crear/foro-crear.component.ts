import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

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
  usuarioActual: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';
  }

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

    // Guardar foro para el usuario actual
    const storedForums = JSON.parse(localStorage.getItem(`forums_${this.usuarioActual}`) || '[]');
    storedForums.push(newForum);
    localStorage.setItem(`forums_${this.usuarioActual}`, JSON.stringify(storedForums));

    // Unir automáticamente al creador al foro
    localStorage.setItem(`joined_${this.usuarioActual}_${this.forumTitle}`, JSON.stringify(true));

    // Notificación y redirección
    alert('El foro ha sido creado exitosamente.');
    this.router.navigate(['/customer/foro/foro-busqueda']);
  }
}
