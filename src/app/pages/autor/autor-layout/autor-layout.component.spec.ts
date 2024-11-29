import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorLayoutComponent } from './autor-layout.component';

describe('AutorLayoutComponent', () => {
  let component: AutorLayoutComponent;
  let fixture: ComponentFixture<AutorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
