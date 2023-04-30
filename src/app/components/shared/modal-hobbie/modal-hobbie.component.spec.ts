import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHobbieComponent } from './modal-hobbie.component';

describe('ModalHobbieComponent', () => {
  let component: ModalHobbieComponent;
  let fixture: ComponentFixture<ModalHobbieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHobbieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHobbieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
