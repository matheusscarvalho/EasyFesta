//Componentes do Angular
import { Component, OnInit } from '@angular/core';

//Componentes da aplicação
import { TabsetComponent } from 'ngx-bootstrap';
import { ContaService } from './conta.service';
import { Fornecedor } from './fornecedor.class';
import { Consumidor } from './consumidor.class';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  consumidor: Consumidor;
  fornecedor: Fornecedor;
  desabilitado: Boolean = true;
  public cpfMask = [/[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/];
  public cepMask = [/[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/,  /[1-9]/];
  public cnpjMask = [/[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, '/', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/];
  public telefoneMask = ["(",/[1-9]/, /[1-9]/,")"," ", /[1-9]/, " ", /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/,  /[1-9]/,  /[1-9]/];
  constructor(private contaService: ContaService) {
    this.consumidor = new Consumidor();
    this.fornecedor = new Fornecedor();
   }

  ngOnInit() {
    this.contaService.getFornecedor(1).subscribe(
      consumidor =>{
      this.consumidor = consumidor;
      }
    );
  }

}
