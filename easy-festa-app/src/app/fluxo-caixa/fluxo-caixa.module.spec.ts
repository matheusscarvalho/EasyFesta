import { FluxoCaixaModule } from './fluxo-caixa.module';

describe('FluxoCaixaModule', () => {
  let FluxoModule: FluxoCaixaModule;

  beforeEach(() => {
    FluxoModule = new FluxoCaixaModule();
  });

  it('should create an instance', () => {
    expect(FluxoCaixaModule).toBeTruthy();
  });
});
