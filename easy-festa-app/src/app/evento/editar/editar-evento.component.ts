import { Component, OnInit } from "@angular/core";
import { EventoService } from "../evento.service";
import { Evento } from "../evento.class";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'editar-evento',
  templateUrl:  './editar-evento.component.html'
})
export class EditarEventoComponent implements OnInit {

  id: number;
  private sub: any;
  evento: Evento;

  constructor(private evtService: EventoService, private route: ActivatedRoute) {
    this.evento = new Evento();
  }

  ngOnInit() {
    // this.evento = this.evtService.getEvento(this.id);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const id = this.route.snapshot.params['id'];
      this.evtService.getEvento(id).subscribe(
        e => {
          this.evento = e;
          console.log(this.evento)
        }
      );

    });
  }

  editEvt() {
    this.evtService.editaEvento(this.evento).subscribe(
      data => {
        console.log('ok ... editado evento');
      }, error => {
        console.log(error);
      }
    );
  }


}
