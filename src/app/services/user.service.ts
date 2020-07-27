import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUserService } from './app-user.service';


export type Resource = "professionals" | "patients";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URI = "http://192.168.0.164:3000/";
  TOKEN = "";

  private _professionals: Professional[] = [];
  private _patients: Patient[] = [];

  get professionals() {
    return this._professionals;
  }

  get patients() {
    return this._patients;
  }

  constructor(private http: HttpClient, private appUserService: AppUserService) {
    this.TOKEN = appUserService.token;
  }

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
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.TOKEN}`);
    return this.http.get<Professional[]>(this.BASE_URI + "professionals", {headers});
  }

  private loadPatients(): Observable<Patient[]> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.TOKEN}`);
    return this.http.get<Patient[]>(this.BASE_URI + "patients", {headers});
  }

  public getUserById(id: string, resource: Resource): Observable<User> {
    return this.http.get<User>(this.BASE_URI + resource + "/" + id);
  }

  public updateUser(user: User, resource: Resource): Observable<User> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.TOKEN}`);
    return this.http.put<User>(this.BASE_URI + resource + "/" + user._id, user, {headers});
  }

  public deleteUser(id: string, resource: Resource) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.TOKEN}`);
    return this.http.delete(this.BASE_URI + resource + "/" + id, {headers});
  }

  public addNewUser(user, resource: Resource): Observable<User> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.TOKEN}`);
    return this.http.post<User>(this.BASE_URI + resource, user, {headers});
  }

  public deleteAllDoctors() {
    return forkJoin(this._professionals.filter(pro => pro.type == "Médico").map(pro => this.deleteUser(pro._id, "professionals")));
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
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.TOKEN}`);
    return this.http.get<Professional[]>(this.BASE_URI + "professionals?" + query, {headers});
  }

  private sendPatientQuery(query: string): Observable<Patient[]> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.TOKEN}`);
    return this.http.get<Patient[]>(this.BASE_URI + "patients?" + query, {headers});
  }
}
