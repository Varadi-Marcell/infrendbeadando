import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileDetailsComponent } from './vechile-details.component';

describe('VechileDetailsComponent', () => {
  let component: VechileDetailsComponent;
  let fixture: ComponentFixture<VechileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VechileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VechileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
