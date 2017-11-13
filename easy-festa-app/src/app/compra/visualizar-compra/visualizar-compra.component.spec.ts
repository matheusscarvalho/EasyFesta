import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCompraComponent } from './visualizar-compra.component';

describe('VisualizarCompraComponent', () => {
  let component: VisualizarCompraComponent;
  let fixture: ComponentFixture<VisualizarCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
