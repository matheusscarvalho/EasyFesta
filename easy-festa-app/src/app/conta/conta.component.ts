//Componentes do Angular
import { Component, OnInit } from '@angular/core';

//Componentes da aplicação
import { TabsetComponent } from 'ngx-bootstrap';
import { ContaService } from './conta.service';
import { Fornecedor } from './fornecedor.class';
import { Consumidor } from './consumidor.class';
import { AutenticacaoService } from './../login/autenticacao/autenticacao.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  consumidor: Consumidor;
  qtdEventos: Number = 0;
  fornecedor: Fornecedor;
  qtdAnuncios: Number = 0;
  desabilitado: Boolean = true;
  cepInvalidoConsumidor: Boolean = false;
  cepInvalidoFornecedor: Boolean = false;
  fornecedorConfirmacaoSenha: String;
  consumidorConfirmacaoSenha: String;
  mensagem: String = "Salvando.";
  /*
    1- Salvando
    2- Salvo com sucesso
    3- Erro ao salvar
  */
  statusAlteracao: Number = 1;

  /*
    1- Obtendo confirmação
    2- Exluindo
    3- Ecluído com sucesso 
    3- Erro ao excluit
  */
  statusExclusao: Number = 1;

  /*
    1- Consumidor
    2- Fornecedor
  */
  tipoPerfil: Number = localStorage.getItem("perfil") == "Consumidor" ? 1: 2;

  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cepMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/,  /[0-9]/];
  public cnpjMask = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public telefoneMask = ["(",/[0-9]/, /[0-9]/,")"," ", /[0-9]/, " ", /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/,  /[0-9]/,  /[0-9]/];
  constructor(private contaService: ContaService, private autenticacaoService: AutenticacaoService) {
  }
    
  ngOnInit() {

    if (this.tipoPerfil == 1) {
      
      this.consumidor = new Consumidor();
      this.consumidor._id = localStorage.getItem('id');
      this.fornecedor = null;
      this.contaService.getConsumidor(this.consumidor._id).subscribe(
        
        informacoesConsumidor =>{
          this.consumidor = informacoesConsumidor.consumidor;
          this.qtdEventos = informacoesConsumidor.qtdEventos;
        }
      );
    }

    else if (this.tipoPerfil == 2) {
      
      this.fornecedor = new Fornecedor();
      this.fornecedor._id = localStorage.getItem('id');
      this.consumidor = null;
      this.contaService.getFornecedor(this.fornecedor._id).subscribe(
        informacoesFornecedor =>{
          this.fornecedor = informacoesFornecedor.fornecedor;
          this.qtdAnuncios = informacoesFornecedor.qtdAnuncios;
        }
      );
    }
  }

  editarPerfil() {
    this.desabilitado = true;

    if (this.consumidor) {
      this.contaService.updateConsumidor(this.consumidor).subscribe(
        
        data => {
          console.log(data);
          this.mensagem = "Perfil salvo com sucesso";
          this.statusAlteracao = 2;
        },
        err => {
          console.error(err);
          this.mensagem = "Erro ao salvar perfil.";
          this.statusAlteracao = 3;
        }
      );
    }

    else if (this.fornecedor) {
      
      this.contaService.updateFornecedor(this.fornecedor).subscribe(
        
        data =>{
          console.log(data);
          this.mensagem = "Perfil salvo com sucesso";
          this.statusAlteracao = 2;
        },
        err => {
          console.error(err);
          this.mensagem = "Erro ao salvar perfil.";
          this.statusAlteracao = 3;
        }
      );
    }
    
  }

  resetarStatusAlteracao() {
    this.mensagem = "Salvando";
    this.statusAlteracao = 1;
  }

  completarEndereco(tipoConta) {
    
        //Entra se estiver completando perfil de consumidor
        if (this.consumidor) {
    
          this.contaService.getEndereco(this.consumidor.endereco.cep).subscribe(
            end=> {
      
                this.cepInvalidoConsumidor = false;
                this.consumidor.endereco.logradouro = end.logradouro;
                this.consumidor.endereco.bairro = end.bairro;
                this.consumidor.endereco.cidade = end.localidade;
                this.consumidor.endereco.uf = end.uf;  
             
            },
            err=> {
      
                this.cepInvalidoConsumidor = true;
                this.consumidor.endereco.logradouro = "";
                this.consumidor.endereco.bairro = "";
                this.consumidor.endereco.cidade = "";
                this.consumidor.endereco.uf = "";        
              
            }           
      
          ); 
          
    
        }
    
        //Entra se estiver completando perfil de fornecedor
        else if (this.fornecedor) {
    
          this.contaService.getEndereco(this.fornecedor.endereco.cep).subscribe(
            end=> { 
              
                this.cepInvalidoFornecedor = false;
                this.fornecedor.endereco.logradouro = end.logradouro;
                this.fornecedor.endereco.bairro = end.bairro;
                this.fornecedor.endereco.cidade = end.localidade;
                this.fornecedor.endereco.uf = end.uf;        
              
            },
            err=> {
      
                this.cepInvalidoConsumidor = true;
                this.fornecedor.endereco.logradouro = "";
                this.fornecedor.endereco.bairro = "";
                this.fornecedor.endereco.cidade = "";
                this.fornecedor.endereco.uf = "";
                         
            }   
            
      
          );
      
          
        }
    
    
      }

      fazerLogout() {
        this.autenticacaoService.fazerLogout();
      }

      removerPerfil() {
        this.statusExclusao = 2;

        if(this.consumidor) {
          this.contaService.removerConsumidor(this.consumidor._id).subscribe(
            data=> {
              console.log(data);
              this.statusExclusao = 3;
            },
            err=> {
              console.log(err);
              this.statusExclusao = 4;
            }
          )
        }

        else if(this.fornecedor) {
          this.contaService.removerFornecedor(this.fornecedor._id).subscribe(
            data=> {
              console.log(data);
              this.statusExclusao = 3;
            },
            err=> {
              console.log(err);
              this.statusExclusao = 4;
            }
          )
        }
      }
}
