//Módulos do Angular
import { Component, OnInit } from '@angular/core';

//Módulos da Aplicação
import { Consumidor } from '../consumidor.class';
import { Fornecedor } from './../fornecedor.class';
import { ContaService } from './../conta.service';

@Component({
  selector: 'app-cadastrar-contas',
  templateUrl: './cadastrar-contas.component.html',
  styleUrls: ['./cadastrar-contas.component.css']
})
export class CadastrarContasComponent implements OnInit {

  consumidor: Consumidor;
  fornecedor: Fornecedor;
  consumidorConfirmacaoSenha: String;
  fornecedorConfirmacaoSenha: String;
  mensagem: String;
  erro: Boolean;

  constructor(private contaService: ContaService) { 
    this.consumidor = new Consumidor();
    this.fornecedor = new Fornecedor();
  }

  ngOnInit() {
  }

  cadastrarConsumidor() {
    this.contaService.addConsumidor(this.consumidor).subscribe(
      data => {
        this.erro = false;
        this.mensagem = "Conta criada com sucesso."
      },
      error => {
        this.erro = true;
        this.mensagem = "Erro ao criar conta."
       
      }
   );
  }

  cadastrarFornecedor() {
    this.contaService.addFornecedor(this.fornecedor).subscribe(
      data => {
        this.erro = false;
        this.mensagem = "Conta criada com sucesso."
      },
      error => {
        this.erro = true;
        this.mensagem = "Erro ao criar conta."
       
      }
   );
  }

}
