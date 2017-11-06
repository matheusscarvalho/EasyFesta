import { Component, OnInit } from "@angular/core";
import { EventoService } from "../evento.service";
import { Evento } from "../evento.class";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'editar-evento',
  templateUrl:  './editar-evento.component.html'
})
export class EditarEventoComponent implements OnInit {

  id: number;
  private sub: any;
  evento: Evento;

  constructor(private evtService: EventoService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.evento = this.evtService.getEvento(this.id);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }


}
