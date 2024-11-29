// base-metrics.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseMetricsService {
  private baseWeightKey = 'baseWeight';
  private baseHeightKey = 'baseHeight';

  getBaseMetrics(): { weight: number | null; height: number | null } {
    const weight = localStorage.getItem(this.baseWeightKey);
    const height = localStorage.getItem(this.baseHeightKey);
    return {
      weight: weight ? +weight : null,
      height: height ? +height : null,
    };
  }

  saveBaseMetrics(weight: number, height: number): void {
    localStorage.setItem(this.baseWeightKey, weight.toString());
    localStorage.setItem(this.baseHeightKey, height.toString());
  }
}
