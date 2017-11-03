//Módulos Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Módulos Aplicação
import { ContratoService } from './../contrato.service';
import { Contrato } from './../contrato.class';

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

  contrato: Contrato;
  idRota: String = this.route.snapshot.params['id'];

  constructor(private contratoService: ContratoService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.contrato = new Contrato();

    if(this.idRota) {
      this.obterContrato();
    } else if(this.tipoPerfil == 2) {
      this.readonly = false; 
           
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

    //Entra se for editar o contrato
    if(this.idRota) {
      this.editarContrato();      
    }

    //Entra se for criar novo contrato
    else {
      this.adicionarContrato();
    }
  }

  adicionarContrato() {
    this.contrato.status = 1;
    this.contratoService.addContrato(this.contrato).subscribe(
      success=> {
        this.contrato._id = success.id;
        this.statusGravacao = 2;
        this.readonly = false;
        this.editorOptions = {
          placeholder: "Insira o texto do contrato...",
          readOnly: this.readonly
        };
        console.log(success);
      },

      err=>{
        this.statusGravacao = 3;
        console.log(err);
      }
    )
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
    this.editarContrato();
  }

  rejeitarContrato() {
    this.contrato.status = 3;
    this.editarContrato();
  }

  rejeitarExclusao() {

    if(this.tipoPerfil == 1) {
      this.contrato.status = 2;
    }
    else if(this.tipoPerfil == 2) {
      this.contrato.status = 1;
    }

    this.editarContrato();    
  }

  editarContrato() {
    
    if(this.tipoPerfil == 2 && (this.contrato.status == 2 || this.contrato.status == 3)){
      this.contrato.status = 1;
    }
   
    this.contratoService.updateContrato(this.contrato).subscribe(
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

  obterContrato() {
    this.contratoService.getContrato(this.idRota).subscribe(
      success=> {
        this.contrato = success;

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
      this.salvarContrato();      
    }

    //Solicitação do fornecedor
    else if (this.tipoPerfil == 2) {
      this.statusExclusao = 5;
      this.contrato.status = 4;
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
      this.contratoService.removerContrato(this.contrato._id).subscribe(
        success=> {
          this.statusExclusao = 3;
          this.contrato.status = 0;
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
