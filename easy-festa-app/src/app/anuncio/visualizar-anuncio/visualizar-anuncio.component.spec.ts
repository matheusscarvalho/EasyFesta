import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAnuncioComponent } from './visualizar-anuncio.component';

describe('VisualizarAnuncioComponent', () => {
  let component: VisualizarAnuncioComponent;
  let fixture: ComponentFixture<VisualizarAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
