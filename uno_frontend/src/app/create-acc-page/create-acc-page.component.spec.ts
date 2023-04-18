import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccPageComponent } from './create-acc-page.component';

describe('CreateAccPageComponent', () => {
  let component: CreateAccPageComponent;
  let fixture: ComponentFixture<CreateAccPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});