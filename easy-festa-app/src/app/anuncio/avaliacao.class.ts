export class Avaliacao {
    _id: String;
    compra: String;
    nota: Number;
    comentario: String;
    data: Date;
    
    //Indica se o consumidor compraria o produto novamente ou não
    novaCompra: Boolean;

    constructor() {
        this.novaCompra = true;
        this.nota = 1;
    }
}
