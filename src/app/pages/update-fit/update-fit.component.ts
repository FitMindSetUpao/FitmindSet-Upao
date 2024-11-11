import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { UpdateFitService } from '../../core/services/update-fit.service';

@Component({
  selector: 'app-update-fit',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './update-fit.component.html',
  styleUrls: ['./update-fit.component.scss']
})
export class UpdateFitComponent implements OnInit {
  weight: number | null = null;
  height: number | null = null;
  originalWeight: number | null = null;
  originalHeight: number | null = null;
  metricEntries: { weight: number; height: number; date: string }[] = [];

  constructor(private updateFitService: UpdateFitService) {}

  ngOnInit() {
    this.loadMetrics();
    this.loadBaseMetrics();
  }

  updateMetrics() {
    if (this.weight && this.height) {
      const newEntry = {
        weight: this.weight,
        height: this.height,
        date: new Date().toLocaleDateString()
      };
      this.metricEntries.push(newEntry);
      this.updateFitService.saveMetrics(this.metricEntries);

      // Actualizar el peso y la altura base y reflejar los cambios en el recuadro
      this.updateFitService.saveBaseMetrics(this.weight, this.height);
      this.originalWeight = this.weight;
      this.originalHeight = this.height;

      // Limpiar los campos del formulario
      this.weight = null;
      this.height = null;
    }
  }

  loadMetrics() {
    this.metricEntries = this.updateFitService.getMetrics();
  }

  loadBaseMetrics() {
    const baseMetrics = this.updateFitService.getBaseMetrics();
    this.originalWeight = baseMetrics.weight;
    this.originalHeight = baseMetrics.height;
    this.weight = baseMetrics.weight;
    this.height = baseMetrics.height;
  }
}
