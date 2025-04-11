import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  header: Header[] = [];
  myHeader: Header = new Header();
  selectedJobId: string = "";

  constructor(public headerService: HeaderService) {
    console.log(this.headerService);
    this.headerService.getHeaderData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(data => {
      this.header = data;
      console.log(this.header);
    });
  }
  confirmAdd() {
    const confirmAdd = window.confirm('¿Estás seguro de que deseas agregar este ítem?');
    if (confirmAdd) {
      this.AgregarJob();
    } else {
      console.log('Acción de agregar cancelada.');
    }
  }

  AgregarJob() {
    console.log(this.myHeader);
     if (this.selectedJobId !== "") {
    this.headerService.updateHeader(this.selectedJobId,this.myHeader).then(() => {
      console.log('Created new item successfully!');
      this.resetForm();
    });
  }else {
      this.headerService.createHeader(this.myHeader).then(() => {
        console.log('Nuevo header creado correctamente!');
        this.resetForm();
      });
    }
  }
  confirmDelete(id?: string) {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este ítem?');
    if (confirmDelete) {
      this.deleteJob(id);
    } else {
      console.log('Acción de eliminar cancelada.');
    }
  }

  deleteJob(id?: string) {
    this.headerService.deleteHeader(id).then(() => {
      console.log('Deleted item successfully!');
    });
    console.log(id);
  }
  confirmEdit(job: Header) {
    const confirmEdit = window.confirm('¿Estás seguro de que deseas editar este ítem?');
    if (confirmEdit) {
      this.selectJobForEdit(job);
    } else {
      console.log('Acción de edición cancelada.');
    }
  }

selectJobForEdit(job: Header) {
    this.myHeader = { ...job };
    this.selectedJobId = job.id || "";
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myHeader = new Header();
    this.selectedJobId = "";
    this.btntxt = "Agregar";
  }
}
