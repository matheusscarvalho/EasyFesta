import { Avaliacao } from './avaliacao.class';
export class Anuncio {
    _id: String;
    fornecedor: String;
    titulo: String;
    descricao: String;
    publicado: boolean;
    tipo: Number;
    avaliacoes: Avaliacao[];
    avaliacaoFinal: Number; 
    aprovacao: Number;
}
