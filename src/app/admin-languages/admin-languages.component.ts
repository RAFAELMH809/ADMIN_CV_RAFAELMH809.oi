import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  languages: Languages[] = [];
  myLanguage: Languages = new Languages();
  selectedJobId: string = "";

  constructor(public languagesService: LanguagesService) {
    console.log(this.languagesService);
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(data => {
      this.languages = data;
      console.log(this.languages);
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
    console.log(this.myLanguage);
    if (this.selectedJobId !== "") {
    this.languagesService.updateLanguage(this.selectedJobId, this.myLanguage).then(() => {
      console.log('Created new item successfully!');
      this.resetForm();
    });
  } else {
      this.languagesService.createLanguage(this.myLanguage).then(() => {
        console.log('Nuevo idioma agregado correctamente!');
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
    this.languagesService.deleteLanguage(id).then(() => {
      console.log('Deleted item successfully!');
    });
    console.log(id);
  }
  confirmEdit(job: Languages) {
    const confirmEdit = window.confirm('¿Estás seguro de que deseas editar este ítem?');
    if (confirmEdit) {
      this.selectJobForEdit(job);
    } else {
      console.log('Acción de edición cancelada.');
    }
  }
 selectJobForEdit(job: Languages) {
    this.myLanguage = { ...job };
    this.selectedJobId = job.id || "";
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myLanguage = new Languages();
    this.selectedJobId = "";
    this.btntxt = "Agregar";
  }
}
