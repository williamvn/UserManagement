import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from './model/user';
import { Professional } from './model/professional';
import { Patient } from './model/patient';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URI = "http://localhost:3000/";

  private _professionals: Professional[];
  private _patients: Patient[];

  get professionals() {
    return this._professionals;
  }

  get patients() {
    return this._patients;
  }

  constructor(private http: HttpClient) { }

  /**
   * Load from the API all the professionals and patients
   */
  public loadUsers(): Observable<boolean> {
    return forkJoin(this.loadPatients(), this.loadProfessionals()).pipe(
      map((response: [Patient[], Professional[]]) => {
        this._patients = response[0];
        this._professionals = response[1];
        return true;
      }
      ));
  }

  private loadProfessionals(): Observable<Professional[]> {
    return this.http.get<Professional[]>(this.BASE_URI + "professionals");
  }

  private loadPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.BASE_URI + "patients");
  }

  public updateUser(user, isProfessional) {
    if (isProfessional) {
      console.log("Updating professional...");
      this.updateProfessional(user);
    }
    else {
      console.log("Updating patient");
      this.updatePatient(user);
    }
  }

  private updateProfessional(user: Professional) {
    this.http.put<Professional>(this.BASE_URI + "professionals/" + user.id, user).subscribe(professional => {
      console.log(professional);
      var index = this._professionals.findIndex(p => p.id == professional.id);
      this._professionals[index] = professional;
    }
    );
  }

  private updatePatient(user: Patient) {
    this.http.put<Patient>(this.BASE_URI + "patients/" + user.id, user).subscribe(patient => {
      console.log(patient);
      var index = this._patients.findIndex(p => p.id == patient.id);
      this._patients[index] = patient;
    });
  }
}
