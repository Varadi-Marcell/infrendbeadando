import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevechileComponent } from './updatevechile.component';

describe('UpdatevechileComponent', () => {
  let component: UpdatevechileComponent;
  let fixture: ComponentFixture<UpdatevechileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatevechileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatevechileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
