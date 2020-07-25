import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { User } from '../model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FormsService {

  //Forms
  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  patientForm: FormGroup;
  professionalForm: FormGroup;
  user: User;

  //flags
  isProfessional: boolean = true;
  isEditable: boolean = true;

  constructor(private formbuilder: FormBuilder, private http: HttpClient) { }

  //Form Builder Functions

  public createProfessionalForm(): void {
    this.createUserForm();
    this.createAddressForm();
    this.professionalForm = this.formbuilder.group({
      noCollegiate: [this.user['noCollegiate'], Validators.required],
      type: [this.user['type']]
    });

  }

  public createPatientForm(): void {
    this.createUserForm();

    this.createAddressForm();

    this.patientForm = this.formbuilder.group({
      NHC: [this.user['NHC'], Validators.required]
    });
  }

  private createUserForm(): void {
    this.personalInfoForm = this.formbuilder.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      secondLastName: [this.user.secondLastName],
      documentationId: [this.user.documentationId, this.docValidation],
      birthDay: [this.user.birthDay],
      gender: [this.user.gender]
    });
  }

  private createAddressForm(): void {
    this.addressForm = this.formbuilder.group({
      street: [this.user.address.street],
      door: [this.user.address.door],
      no: [this.user.address.no],
      city: [this.user.address.city, this.noSpecialChars],
      zipCode: [this.user.address.zipCode, Validators.pattern(/^[0-9]{5,5}$/)]
    })
  }

  /**
   * This function load the cities availables for suggestion in the form
   */
  public loadCities(): Observable<string[]> {
    return this.http.get("../../assets/cities.json").pipe(map((res) => {
      return res["cities"];
    }));
  }
 
  //Get Info from Reactive Forms

  public getUser(): void {
    this.mapFormToUser(this.personalInfoForm);
    this.mapFormToUser(this.addressForm, "address");
    if (this.isProfessional) {
      this.mapFormToUser(this.professionalForm);
    }
    else {
      this.getInsuranceCarriers();
    }
  }

  private getInsuranceCarriers() {
    var insurancesKeys: string[] = Object.keys(this.patientForm.getRawValue());
    this.user['insuranceCarriers'] = [];
    insurancesKeys.forEach((key) => {
      if (key == "NHC") {
        this.user['NHC'] = this.patientForm.value['NHC'];
      }
      else {
        this.user['insuranceCarriers'].push(this.patientForm.value[key]);
      }
    });
  }

  private mapFormToUser(form: FormGroup, property: string = ""): void {
    if (!property) {
      this.user = Object.assign(this.user, form.getRawValue());
    }
    else {
      this.user[property] = form.getRawValue();
    }
  }

  //Validators

  public docValidation(c: FormControl) {
    let PASSPORT = new RegExp(/^[a-z A-Z]{3}[0-9]{6}[a-z]?$/);
    let DNI = new RegExp(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/);
    let NIE = new RegExp(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/);

    let result = PASSPORT.test(c.value);
    result = result || !c.value;
    result = result || DNI.test(c.value);
    result = result || NIE.test(c.value);
    return result ? null : {
      validate: {
        valid: false
      }
    };
  }

  public noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
      validate: {
        valid: true
      }
    }:null;
  }

  public allowOnlyNumbers(event: KeyboardEvent): void {
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 9 && event.keyCode !== 8) {
      event.preventDefault();
    }
  }

}
