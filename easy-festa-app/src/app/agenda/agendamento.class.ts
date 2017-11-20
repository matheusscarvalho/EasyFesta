export class Agendamento {
    _id: String;
    title: String;
    start: Date;
    description: String;
    time: String;
    usuario: String;

    /*
        1- Comum
        2- Originário de evento (Não pode ser apagado)
    */
    kind: Number;
}
