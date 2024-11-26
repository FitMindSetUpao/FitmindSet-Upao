import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecursoDetailsComponent} from '../../../../shared/components/recurso-details/recurso-details.component';

@Component({
  selector: 'app-recurso-info-page',
  standalone: true,
  imports: [
    RecursoDetailsComponent
  ],
  templateUrl: './recurso-info-page.component.html',
  styleUrl: './recurso-info-page.component.scss'
})
export class RecursoInfoPageComponent {
  recursoid: number;
  private route = inject(ActivatedRoute);

  constructor() {
    this.recursoid = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.recursoid);
  }
}
