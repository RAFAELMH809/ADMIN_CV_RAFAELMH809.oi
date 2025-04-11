// c
import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  interests: Interests[] = [];
  myInterest: Interests = new Interests();
  selectedJobId: string = "";

  constructor(public interestsService: InterestsService) {
    console.log(this.interestsService);
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(data => {
      this.interests = data;
      console.log(this.interests);
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
    console.log(this.myInterest);
    if (this.selectedJobId !== "") {
    this.interestsService.updateInterest(this.selectedJobId,this.myInterest).then(() => {
      console.log('Created new item successfully!');
      this.resetForm();
    });
   } else {
      this.interestsService.createInterest(this. myInterest).then(() => {
        console.log('Nuevo interés creado correctamente!');
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
    this.interestsService.deleteInterest(id).then(() => {
      console.log('Deleted item successfully!');
    });
    console.log(id);
  }
  confirmEdit(job: Interests) {
    const confirmEdit = window.confirm('¿Estás seguro de que deseas editar este ítem?');
    if (confirmEdit) {
      this.selectJobForEdit(job);
    } else {
      console.log('Acción de edición cancelada.');
    }
  }
selectJobForEdit(job: Interests) {
    this.myInterest = { ...job };
    this.selectedJobId = job.id || "";
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myInterest = new Interests();
    this.selectedJobId = "";
    this.btntxt = "Agregar";
  }
}
