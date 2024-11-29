import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaDetallesComponent } from './meta-detalles.component';

describe('MetaDetallesComponent', () => {
  let component: MetaDetallesComponent;
  let fixture: ComponentFixture<MetaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
