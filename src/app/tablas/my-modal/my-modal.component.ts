import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TABLAS } from 'src/app/config';
import { CentroCosto } from 'src/app/interfaces/centrocosto';
import { EstadoSolicitud } from 'src/app/interfaces/estadosolicitud';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { CrudService } from 'src/app/shared/crud.service';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {


  @Input() editTabla: boolean;
  @Input() table: string;
  @Input() ref: string;
  @Input() back: string;
  @Input() estadosolicitud$: Observable<EstadoSolicitud[]> = null;
  @Input() centrocosto$: Observable<CentroCosto[]> = null;
  @Input() solicitud$: Observable<Solicitud[]> = null;
  @Input() id:number= null;

  @Input () value: string;
  @Output() outputEvent : EventEmitter<string> = new EventEmitter<string>();

  enviar(val:string) {
      this.outputEvent.emit(val);
  }

  sol$: Observable<Solicitud> = null;

  Tablas = TABLAS;

  compon: Array<string>;
  listForm: FormGroup;
  componentRef: any;

  observableNumber: Observable<number>;
  mod$: Observable<Solicitud>;

  constructor( private crud: CrudService, private fb: FormBuilder ) { }

  ngOnDestroy() {

}

  ingresar() {
  // alert('Hola');
  let param = this.ref;
  console.log('ref', this.ref);
  console.log('id', this.id);
  if (this.back) {
    Object.entries(this.back).forEach(([k, v]) => {
      // console.log(`onSubmit() : Details -> listForm.value : ${this.listForm.value} k -> ${k}`);
      param =  param + '/' + this.listForm.value[k].toString();
    });
    }
   console.log(`param : ${param} table -> ${this.table}`);
   console.log(`listForm -> ${JSON.stringify(this.listForm.value)}`);

   this.mod$ =  this.crud.agregar(this.listForm.value,  param);

   let value = JSON.stringify(this.listForm.value);
   this.enviar('ingre'+value);

  }

  borrar() {
    this.mod$ = this.crud.borrar(this.listForm.value['id']);
  }

  editar() {
    this.mod$ = this.crud.modificar(this.listForm.value);
    let value = JSON.stringify(this.listForm.value);
    this.enviar('edita'+value);
  }


  ngOnInit(): void {

    const js = {};
    let i = 0;

    this.compon = this.Tablas[this.table].compon;

    var lgroup:Object = this.Tablas[this.table].lgroup;;

    this.listForm = this.fb.group(lgroup);

    console.log(this.id);

    this.sol$ = this.crud.getSolicitud(this.id).pipe(tap(sol =>
      {

        console.log(sol);

        lgroup['CentroCosto'] = [sol.centrocostoId];
        lgroup['EstadoSolicitud'] = [sol.estadosolicitudId]

        this.listForm = this.fb.group(lgroup);
        this.listForm.patchValue(sol)
      }
       ));
  }


}
