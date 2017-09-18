import { CompraModule } from './compra.module';

describe('CompraModule', () => {
  let compraModule: CompraModule;

  beforeEach(() => {
    compraModule = new CompraModule();
  });

  it('should create an instance', () => {
    expect(compraModule).toBeTruthy();
  });
});
