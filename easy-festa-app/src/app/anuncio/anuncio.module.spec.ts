import { AnuncioModule } from './anuncio.module';

describe('AnuncioModule', () => {
  let anuncioModule: AnuncioModule;

  beforeEach(() => {
    anuncioModule = new AnuncioModule();
  });

  it('should create an instance', () => {
    expect(anuncioModule).toBeTruthy();
  });
});
