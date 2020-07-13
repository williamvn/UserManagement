import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from './model/user';
import { Professional } from './model/professional';
import { exception } from 'console';
import { Patient } from './model/patient';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _professionals :Professional[];
  private _patients :Patient[];
  
  get professionals(){
    return this._professionals;
  }

  get patients(){
    return this._patients;
  }

  constructor() { }

  /**
   * Load from the API all the professionals and patients
   */
  public loadUsers():void {
    //Use Fork Join
  }

  private loadProfessionals():Professional[]{
    //fetch professionals
    throw new exception("Not Implemented");
  }

  private loadPatients():Patient[]{
    //fetch Patients;
    throw new exception("Not Implemented");
  }

}
