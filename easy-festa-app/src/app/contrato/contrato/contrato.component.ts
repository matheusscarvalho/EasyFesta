//Módulos Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Módulos Aplicação
import { CompraService } from './../../compra/compra.service';
import { Contrato } from './../contrato.class';
import { Compra } from './../../compra/compra.class';
import { Fornecedor } from './../../conta/fornecedor.class';
import { Consumidor } from './../../conta/consumidor.class';
import { ContaService } from './../../conta/conta.service';


@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  /*
    1- Consumidor
    2- Fornecedor
  */
  tipoPerfil: Number = localStorage.getItem("perfil") == "Consumidor" ? 1: 2;
  readonly: Boolean = this.obterTipoEditor();
  tema: String = this.tipoPerfil == 1 ? "bubble": "snow";
  contrato: Contrato = new Contrato();
  consumidor: Consumidor = new Consumidor();
  fornecedor: Fornecedor = new Fornecedor();
  collapseInfEnvolvidos: boolean = false;
  collapseInfCompra: boolean = false;
  
  editorOptions : Object =  {
    placeholder: "Insira o texto do contrato...",
    theme: this.tema, 
    readOnly: this.readonly
    
  };

  /*
    1- Salvando
    2- Salvo com sucesso
    3- Erro ao salvar
  */
  statusGravacao: Number;

  /*
    1- Confirmação da exclusão
    2- Excluindo
    3- Excluído com sucesso
    4- Erro ao excluir
    5- Solicitação enviada com sucesso.

  */
  statusExclusao: Number = 1;

  compra: Compra = new Compra();
  idUsuario: String = localStorage.getItem('id');
  idRota: String = this.route.snapshot.params['id'];

  constructor(private compraService: CompraService, private route: ActivatedRoute, private contaService: ContaService) { }

  ngOnInit() {

    this.contrato.status = 0;
    if(this.idRota) {
      this.obterCompra();
    } else if(this.tipoPerfil == 2) {
      this.readonly = false;            
    }

  }

  obterDadosEnvolvidoContrato(){
    if(this.tipoPerfil == 1) {
      this.contaService.getFornecedor(this.compra.fornecedor).subscribe(
        data=> {
          this.fornecedor = data.fornecedor;
        },
        error=> {
          console.error(error);
        }
      );
    } else if(this.tipoPerfil == 2) {
      this.contaService.getConsumidor(this.compra.consumidor).subscribe(
        data=> {

          this.consumidor = data.consumidor;
        },
        error=> {
          console.error(error);
        }
      );
    }
  }

  resetarStatusGravacao() {
    this.statusGravacao = 1;
  }

  resetarStatusExclusao() {
    this.statusExclusao = 1;
  }

  salvarContrato() {
    
    this.statusGravacao = 1;
    
    if(this.compra.status == 1) {
      this.compra.status = 2;
    }

    this.editarContrato();
    
    
    
  }

  obterTipoEditor() {
    if(this.tipoPerfil == 1) {
      return true;
    } else {
      return false;
    }
  }

  aceitarContrato() {
    this.contrato.status = 2;
    this.compra.contrato = this.contrato;
    this.editarContrato();
  }

  rejeitarContrato() {
    this.contrato.status = 3;
    this.compra.contrato = this.contrato;
    this.editarContrato();
  }

  rejeitarExclusao() {

    if(this.tipoPerfil == 1) {
      this.contrato.status = 2;
      this.compra.contrato = this.contrato;
    }
    else if(this.tipoPerfil == 2) {
      this.contrato.status = 1;
      this.compra.contrato = this.contrato;
    }

    this.editarContrato();    
  }

  editarContrato() {
    
    if((this.tipoPerfil == 2 && (this.contrato.status == 2 || this.contrato.status == 3)) || this.contrato.status == 0){
      this.contrato.status = 1; 
      this.editorOptions = {
        placeholder: "Insira o texto do contrato...",
        readOnly: this.readonly
      };     
    }
    this.compra.contrato = this.contrato;
    this.compraService.updateCompra(this.compra).subscribe(
      success=> {
        this.statusGravacao = 2;
        console.log(success);
      },

      err=>{
        this.statusGravacao = 3;
        console.log(err);
      }
    )
  }

  obterCompra() {
    this.compraService.getCompra(this.idRota).subscribe(
      success=> {
        this.compra = success;
        this.obterDadosEnvolvidoContrato();

        if(this.compra.contrato) {
          this.contrato = this.compra.contrato;
        }

        if(this.tipoPerfil == 2 && this.contrato.status > 1) {
          this.readonly = false;          
        }
    
      },

      err=>{
        console.log(err);
      }
    )

  }

  solicitarRemocaoContrato() {
    //Solicitação do consumidor
    if(this.tipoPerfil == 1) {
      this.statusExclusao = 5;
      this.contrato.status = 5;
      this.compra.contrato = this.contrato;
      this.salvarContrato();      
    }

    //Solicitação do fornecedor
    else if (this.tipoPerfil == 2) {
      this.statusExclusao = 5;
      this.compra.contrato.status = 4;
      this.compra.contrato = this.contrato;
      this.salvarContrato();
    }
  }

  removerContrato() {

    //Entra se for uma solicitação inicial de exclusão
    if(this.contrato.status == 2) {
      this.solicitarRemocaoContrato();   
    }

    //Entra se ambos estiverem de acordo com a exclusão
    else {
      this.compra.contrato = null;
      this.contrato = null;
      this.compraService.updateCompra(this.compra).subscribe(
        success=> {
          this.statusExclusao = 3;
          this.contrato.status = 0;
          this.compra.contrato = this.contrato;
          console.log(success);

        },

        err=>{
          this.statusExclusao = 4;
          console.log(err);
        }
      )
    }
  }
}
