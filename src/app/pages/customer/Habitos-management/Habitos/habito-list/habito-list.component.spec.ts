import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitoListComponent } from './habito-list.component';

describe('HabitoListComponent', () => {
  let component: HabitoListComponent;
  let fixture: ComponentFixture<HabitoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
