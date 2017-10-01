import { ContaModule } from './conta.module';

describe('ContaModule', () => {
  let contaModule: ContaModule;

  beforeEach(() => {
    contaModule = new ContaModule();
  });

  it('should create an instance', () => {
    expect(contaModule).toBeTruthy();
  });
});
