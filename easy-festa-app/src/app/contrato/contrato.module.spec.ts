import { ContratoModule } from './contrato.module';

describe('ContratoModule', () => {
  let contratoModule: ContratoModule;

  beforeEach(() => {
    contratoModule = new ContratoModule();
  });

  it('should create an instance', () => {
    expect(contratoModule).toBeTruthy();
  });
});
