import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoPageComponent } from './uno-page.component';

describe('UnoPageComponent', () => {
  let component: UnoPageComponent;
  let fixture: ComponentFixture<UnoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});