import { EventoModule } from './evento.module';

describe('EventoModule', () => {
  let eventoModule: EventoModule;

  beforeEach(() => {
    eventoModule = new EventoModule();
  });

  it('should create an instance', () => {
    expect(eventoModule).toBeTruthy();
  });
});
