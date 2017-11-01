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
  cepInvalidoConsumidor: Boolean = false;
  cepInvalidoFornecedor: Boolean = false;

  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cepMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/,  /[0-9]/];
  public cnpjMask = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public telefoneMask = ["(",/[0-9]/, /[0-9]/,")"," ", /[0-9]/, " ", /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/,  /[0-9]/,  /[0-9]/];
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

  completarEndereco(tipoConta) {

    //Entra se estiver completando perfil de consumidor
    if (tipoConta == 1) {

      this.contaService.getEndereco(this.consumidor.endereco.cep).subscribe(
        end=> {
            if (end.erro) {
              this.cepInvalidoConsumidor = true;
              this.consumidor.endereco.logradouro = "";
              this.consumidor.endereco.bairro = "";
              this.consumidor.endereco.cidade = "";
              this.consumidor.endereco.uf = "";  
              this.consumidor.endereco.cep = "";

            }

            else {
              this.cepInvalidoConsumidor = false;
              this.consumidor.endereco.logradouro = end.logradouro;
              this.consumidor.endereco.bairro = end.bairro;
              this.consumidor.endereco.cidade = end.localidade;
              this.consumidor.endereco.uf = end.uf;  
            }
         
        },
        err=> {
  
            this.cepInvalidoConsumidor = true;
            this.consumidor.endereco.logradouro = "";
            this.consumidor.endereco.bairro = "";
            this.consumidor.endereco.cidade = "";
            this.consumidor.endereco.uf = "";  
            this.consumidor.endereco.cep = "";      
          
        }           
  
      ); 
      

    }

    //Entra se estiver completando perfil de fornecedor
    else if (tipoConta == 2) {

      this.contaService.getEndereco(this.fornecedor.endereco.cep).subscribe(
        end=> { 
          
            if(end.erro) {
              
                this.cepInvalidoConsumidor = true;
                this.fornecedor.endereco.logradouro = "";
                this.fornecedor.endereco.bairro = "";
                this.fornecedor.endereco.cidade = "";
                this.fornecedor.endereco.uf = "";
                this.fornecedor.endereco.cep = "";

            }
            else {
                this.cepInvalidoFornecedor = false;
                this.fornecedor.endereco.logradouro = end.logradouro;
                this.fornecedor.endereco.bairro = end.bairro;
                this.fornecedor.endereco.cidade = end.localidade;
                this.fornecedor.endereco.uf = end.uf;        
          
            }
        },
        err=> {
  
            this.cepInvalidoConsumidor = true;
            this.fornecedor.endereco.logradouro = "";
            this.fornecedor.endereco.bairro = "";
            this.fornecedor.endereco.cidade = "";
            this.fornecedor.endereco.uf = "";
            this.fornecedor.endereco.cep = "";
                     
        }   
        
  
      );
  
      
    }


  }

}
