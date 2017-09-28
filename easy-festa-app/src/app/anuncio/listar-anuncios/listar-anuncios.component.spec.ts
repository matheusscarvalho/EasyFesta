import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAnunciosComponent } from './listar-anuncios.component';

describe('ListarAnunciosComponent', () => {
  let component: ListarAnunciosComponent;
  let fixture: ComponentFixture<ListarAnunciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAnunciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
