import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAnunciosComponent } from './cadastrar-anuncios.component';

describe('CadastrarAnunciosComponent', () => {
  let component: CadastrarAnunciosComponent;
  let fixture: ComponentFixture<CadastrarAnunciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAnunciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
