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
  styleUrl: './foro-crear.component.scss'
})
export class ForoCrearComponent {
  forumTitle: string = '';
  forumDescription: string = '';

  constructor(private router: Router) {}

  createForum() {
    // Aquí iría la lógica para guardar el foro
    console.log('Foro creado:', this.forumTitle, this.forumDescription);
    this.router.navigate(['/customer/comunidad']); // Vuelve a la lista de foros
  }
}
