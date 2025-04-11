//c
import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  skills: Skills[] = [];
  mySkills: Skills = new Skills();
  selectedJobId: string = "";

  constructor(public skillsService: SkillsService) {
	  console.log(this.skillsService);
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(data => {
      this.skills = data;
      console.log(this.skills);
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
	  console.log(this.mySkills);
	  if (this.selectedJobId !== "") {
    this.skillsService.updateSkills(this.selectedJobId,this.mySkills).then(() => {
      console.log('Created new item successfully!');
      this.resetForm();
    });
   } else {
      this.skillsService.createSkills(this.mySkills).then(() => {
        console.log('Nueva skill creada correctamente!');
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
  deleteJob(id?  :string) {
    this.skillsService.deleteSkills(id).then(() => {
      console.log('Deleted item successfully!');
    });
    console.log(id);
  }
  confirmEdit(job: Skills) {
    const confirmEdit = window.confirm('¿Estás seguro de que deseas editar este ítem?');
    if (confirmEdit) {
      this.selectJobForEdit(job);
    } else {
      console.log('Acción de edición cancelada.');
    }
  }

selectJobForEdit(job: Skills) {
    this.mySkills = { ...job };
    this.selectedJobId = job.id || "";
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.mySkills = new Skills();
    this.selectedJobId = "";
    this.btntxt = "Agregar";
  }
}

