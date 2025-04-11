import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates} from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  certificates: Certificates[] = [];
  myCertificates: Certificates = new Certificates();
  selectedJobId: string = "";

  constructor(public certificatesService: CertificatesService) {
	  console.log(this.certificatesService);
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(data => {
      this.certificates = data;console.log(this.certificates);
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
	  console.log(this.myCertificates);
	  if (this.selectedJobId !== "") {
    this.certificatesService.updateCertificates(this.selectedJobId,this.myCertificates).then(() => {
      console.log('Created new certificates successfully!');
      this.resetForm();
    });
  }else{
	   this.certificatesService.createCertificates(this.myCertificates).then(() => {
        console.log('Nuevo certificado creado correctamente!');
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
    this.certificatesService.deleteCertificates(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }
  confirmEdit(job: Certificates) {
    const confirmEdit = window.confirm('¿Estás seguro de que deseas editar este ítem?');
    if (confirmEdit) {
      this.selectJobForEdit(job);
    } else {
      console.log('Acción de edición cancelada.');
    }
  }


selectJobForEdit(job: Certificates) {
    this.myCertificates = { ...job };
    this.selectedJobId = job.id || "";
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myCertificates = new Certificates();
    this.selectedJobId = "";
    this.btntxt = "Agregar";
  }
}

