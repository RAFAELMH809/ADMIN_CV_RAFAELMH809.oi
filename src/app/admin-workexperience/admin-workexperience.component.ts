import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();
  selectedJobId: string = "";

  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data;console.log(this.workExperience);
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
    console.log(this.myWorkExperience);
    if (this.selectedJobId !== "") {
      this.workExperienceService.updateWorkExperience(this.selectedJobId, this.myWorkExperience).then(() => {
        console.log('Trabajo actualizado correctamente!');
        this.resetForm();  
      });
    } else {
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Nuevo trabajo creado correctamente!');
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
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log('Trabajo eliminado correctamente');
    });
    console.log(id);
   }
   
   confirmEdit(job: WorkExperience) {
    const confirmEdit = window.confirm('¿Estás seguro de que deseas editar este ítem?');
    if (confirmEdit) {
      this.selectJobForEdit(job);
    } else {
      console.log('Acción de edición cancelada.');
    }
  }
 
  selectJobForEdit(job: WorkExperience) {
    this.myWorkExperience = { ...job };  
    this.selectedJobId = job.id || ""; 
    this.btntxt = "Actualizar";  
  }

  
  resetForm() {
    this.myWorkExperience = new WorkExperience();  
    this.selectedJobId = "";  
    this.btntxt = "Agregar"; 
  }
}
