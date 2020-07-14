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
  BASE_URI= "http://localhost:3000/";

  private _professionals :Professional[];
  private _patients :Patient[];
  
  get professionals(){
    return this._professionals;
  }

  get patients(){
    return this._patients;
  }

  constructor(private http:HttpClient) { }

  /**
   * Load from the API all the professionals and patients
   */
  public loadUsers(): Observable<boolean> {
    return forkJoin(this.loadPatients(), this.loadProfessionals()).pipe( 
      map((response:[Patient[], Professional[]]) => {
          this._patients = response[0];
          this._professionals = response[1];
          return true;
        }
    ));
  }

  private loadProfessionals():Observable<Professional[]>{
    return this.http.get<Professional[]>(this.BASE_URI + "professionals");
  }

  private loadPatients():Observable<Patient[]>{
    return this.http.get<Patient[]>(this.BASE_URI + "patients");
  }

}
