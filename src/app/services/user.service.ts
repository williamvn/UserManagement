import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


export type Resource = "professionals" | "patients";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URI = "http://localhost:3000/";

  private _professionals: Professional[] = [];
  private _patients: Patient[] = [];

  get professionals() {
    return this._professionals;
  }

  get patients() {
    return this._patients;
  }

  constructor(private http: HttpClient) { }

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

  public getUserById(id: number, resource: Resource): Observable<User> {
    return this.http.get<User>(this.BASE_URI + resource + "/" + id);
  }

  public updateUser(user, resource: Resource):Observable<User> {
    return this.http.put<User>(this.BASE_URI + resource + "/" + user.id, user);
  }

  public deleteUser(userId, resource: Resource) {
    return this.http.delete(this.BASE_URI + resource + "/" + userId);
  }

  public addNewUser(user, resource: Resource):Observable<User> {
    return this.http.post<User>(this.BASE_URI + resource, user);
  }

  public deleteAllDoctors() {
    return forkJoin(this._professionals.filter(pro => pro.type == "Médico").map(pro => this.deleteUser(pro.id, "professionals")));
  }

  public sendQuery(query: string): Observable<boolean> {
    return forkJoin(this.sendProfessionalQuery(query), this.sendPatientQuery(query)).pipe(
      map((response: [Professional[], Patient[]]) => {
        this._professionals = response[0];
        this._patients = response[1];
        return true;
      }));
  }

  private sendProfessionalQuery(query: string): Observable<Professional[]> {
    return this.http.get<Professional[]>(this.BASE_URI + "professionals?" + query);
  }

  private sendPatientQuery(query: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.BASE_URI + "patients?" + query);
  }
}
