// import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { delay, flatMap, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { CentroCosto } from 'src/app/interfaces/centrocosto';
import { EstadoSolicitud } from 'src/app/interfaces/estadosolicitud';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { CrudService } from 'src/app/shared/crud.service';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { TABLAS } from './../../config';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})

export class SolicitudComponent implements OnInit {

  @Output() outputEvent : EventEmitter<any> = new EventEmitter<boolean>();

  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  tipo:string='listar';

  refresh: Subject<string>; // For load/reload
  loading: boolean = true; // Turn spinner on and off

  solicitudes = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  solicitud$: Observable<Solicitud[]>;
  backref = '75';

  // array = [10, 20, 30];
  // result$ = from(this.array);

  table = "Solicitud";

  centrocosto$: Observable<CentroCosto[]> = null;
  estadosolicitud$: Observable<EstadoSolicitud[]> = null;
  Tablas = TABLAS;
  back = this.Tablas[this.table].back;
  componentRef : any;
  inverse: object = {};

  constructor(private dataService: CrudService,
              private resolver: ComponentFactoryResolver,
              // private http: HttpClient
    ) { }

  load() {
    this.solicitud$ = this.dataService.getData(this.table, this.backref)
    .pipe(takeUntil(this.destroy$));
  }

  enviar(val:boolean) {
    this.outputEvent.emit(val);
}

  ngOnInit() {

    this.load();

    if (this.back) {
    this.get_select();
    this.obtiene_back();
    }

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  get_select() {

    Object.entries(this.back).forEach(([k, v]) => {


      if (k === 'CentroCosto') {
        this.centrocosto$ = this.dataService.getData(k);
      }
      else if (k == 'EstadoSolicitud') {
        this.estadosolicitud$ = this.dataService.getData(k);
      }


    } );

  }

  obtiene_back() {

    Object.entries(this.back).forEach(([k, v]) => {
      const   tmp: object = {};
      tmp[k] = v;
      this.inverse[tmp[k]] = k;
      } );
  }

  valueResponse(respuesta) {
    alert(respuesta);
   }

  activa_modal(editTabla: boolean, id: number = null)  {


    this.entry.clear();

    const factory = this.resolver.resolveComponentFactory(MyModalComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.table = 'Solicitud';
    this.componentRef.instance.editTabla = editTabla;
    this.componentRef.instance.ref = this.backref;
    this.componentRef.instance.back = this.back;
    this.componentRef.instance.estadosolicitud$ = this.estadosolicitud$;
    this.componentRef.instance.centrocosto$ = this.centrocosto$;
    this.componentRef.instance.solicitud$ = this.solicitud$;
    this.componentRef.instance.id = id;
    this.componentRef.instance.outputEvent.subscribe((val:string) => {
      // this.tipo = val.substr(0,4);
      console.log('val -> ',val);
      this.enviar(true);
      // this.val  = JSON.parse(val.substr(5));

      // this.ngOnInit();


      // result.subscribe(x => console.log(x));

      });
}


}
