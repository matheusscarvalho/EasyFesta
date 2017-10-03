import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCaixaComponent } from './fluxo-caixa.component';

describe('ContaComponent', () => {
  let component: FluxoCaixaComponent;
  let fixture: ComponentFixture<FluxoCaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoCaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
