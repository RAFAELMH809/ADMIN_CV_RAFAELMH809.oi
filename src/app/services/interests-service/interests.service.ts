import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private dbPath = '/Interests'; 
  interestsRef: AngularFirestoreCollection<Interests>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath); 
  }

  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsRef;
  }
   createInterest(myJob: Interests): any {
    return this.interestsRef.add({ ...myJob });
  }
   updateInterest(id: string, myJob: Interests): Promise<void> {
    return this.interestsRef.doc(id).update({ ...myJob });
  }

  deleteInterest(id?: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}

