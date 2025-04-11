import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dbPath = '/Header'; 
  headerRef: AngularFirestoreCollection<Header>;

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath); 
  }
  getHeaderData(): AngularFirestoreCollection<Header> {
    return this.headerRef;
  }
  createHeader(myJob: Header): any {
    return this.headerRef.add({ ...myJob });
  }
  updateHeader(id: string, myJob: Header): Promise<void> {
    return this.headerRef.doc(id).update({ ...myJob });
  }
  deleteHeader(id? :string): Promise<void> {
    return this.headerRef.doc(id).delete();
  }
}

