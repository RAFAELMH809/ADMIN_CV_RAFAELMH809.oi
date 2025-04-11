import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/Skills';
  skillsRef: AngularFirestoreCollection<Skills>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<Skills> {
    return this.skillsRef;
  }

  createSkills(myJob: Skills): any {
    return this.skillsRef.add({ ...myJob });
  }
   updateSkills(id: string, myJob: Skills): Promise<void> {
    return this.skillsRef.doc(id).update({ ...myJob });
  }

  deleteSkills(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }
}

