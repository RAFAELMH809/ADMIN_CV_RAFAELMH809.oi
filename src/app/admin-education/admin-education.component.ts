import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  education: Education[] = [];
  myEducation: Education = new Education();
  selectedJobId: string = ""; 

  constructor(public educationService: EducationService)
  {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(data => {
      this.education = data;
      console.log(this.education);
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
    console.log(this.myEducation);
    if (this.selectedJobId !== ""){
    this.educationService.updateEducation(this.selectedJobId,this.myEducation).then(() => {
      console.log('Created new item successfully!');
      this.resetForm();
    });
  }else{
   this.educationService.createEducation(this.myEducation).then(() => {
      console.log('Nuevo registro de educación creado correctamente!');
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

  deleteJob(id? :string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }
  confirmEdit(job: Education) {
    const confirmEdit = window.confirm('¿Estás seguro de que deseas editar este ítem?');
    if (confirmEdit) {
      this.selectJobForEdit(job);
    } else {
      console.log('Acción de edición cancelada.');
    }
  }

selectJobForEdit(job: Education) {
    this.myEducation = { ...job }; 
    this.selectedJobId = job.id || "";  
    this.btntxt = "Actualizar";  
  }

  
  resetForm() {
    this.myEducation = new Education();  
    this.selectedJobId = "";  
    this.btntxt = "Agregar";
  }
}
