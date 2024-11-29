import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaMetaComponent } from './estadistica-meta.component';

describe('EstadisticaMetaComponent', () => {
  let component: EstadisticaMetaComponent;
  let fixture: ComponentFixture<EstadisticaMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaMetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticaMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
