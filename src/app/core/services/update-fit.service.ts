import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateFitService {
  private storageKey = 'fitnessMetrics';
  private baseWeightKey = 'baseWeight';
  private baseHeightKey = 'baseHeight';

  getMetrics(): { weight: number; height: number; date: string }[] {
    const savedMetrics = localStorage.getItem(this.storageKey);
    return savedMetrics ? JSON.parse(savedMetrics) : [];
  }

  saveMetrics(metrics: { weight: number; height: number; date: string }[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(metrics));
  }

  // Nueva función para obtener el peso y altura base
  getBaseMetrics(): { weight: number | null; height: number | null } {
    const weight = localStorage.getItem(this.baseWeightKey);
    const height = localStorage.getItem(this.baseHeightKey);
    return {
      weight: weight ? +weight : null,
      height: height ? +height : null,
    };
  }

  // Nueva función para guardar el peso y altura base
  saveBaseMetrics(weight: number, height: number): void {
    localStorage.setItem(this.baseWeightKey, weight.toString());
    localStorage.setItem(this.baseHeightKey, height.toString());
  }
}
