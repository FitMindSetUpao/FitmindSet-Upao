import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-update-fit',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './update-fit.component.html',
  styleUrl: './update-fit.component.scss'
})
export class UpdateFitComponent {

}
