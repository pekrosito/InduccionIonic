import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenVentasPage } from './resumen-ventas.page';

describe('ResumenVentasPage', () => {
  let component: ResumenVentasPage;
  let fixture: ComponentFixture<ResumenVentasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenVentasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenVentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
