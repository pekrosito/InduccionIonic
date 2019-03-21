import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenPage } from './almacen.page';

describe('AlmacenPage', () => {
  let component: AlmacenPage;
  let fixture: ComponentFixture<AlmacenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
