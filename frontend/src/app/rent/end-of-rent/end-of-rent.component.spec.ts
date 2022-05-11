import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfRentComponent } from './end-of-rent.component';

describe('EndOfRentComponent', () => {
  let component: EndOfRentComponent;
  let fixture: ComponentFixture<EndOfRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndOfRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOfRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
