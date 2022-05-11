import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechilesComponent } from './vechiles.component';

describe('VechilesComponent', () => {
  let component: VechilesComponent;
  let fixture: ComponentFixture<VechilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VechilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VechilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
