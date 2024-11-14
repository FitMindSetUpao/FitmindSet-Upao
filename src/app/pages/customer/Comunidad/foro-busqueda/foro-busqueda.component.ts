import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  styleUrl: './foro-busqueda.component.scss'
})
export class ForoBusquedaComponent {

}
