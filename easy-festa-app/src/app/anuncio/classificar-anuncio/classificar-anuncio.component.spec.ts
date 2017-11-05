import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificarAnuncioComponent } from './classificar-anuncio.component';

describe('ClassificarAnuncioComponent', () => {
  let component: ClassificarAnuncioComponent;
  let fixture: ComponentFixture<ClassificarAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificarAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
