import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscarsComponent } from './oscars.component';

describe('OscarsComponent', () => {
  let component: OscarsComponent;
  let fixture: ComponentFixture<OscarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OscarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OscarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
