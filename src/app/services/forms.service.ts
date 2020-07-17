import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

  public createProfessionalForm(): void {
    this.createUserForm();
    this.createAddressForm();
    this.professionalForm = this.formbuilder.group({
      noCollegiate: [this.user['noCollegiate'], Validators.required],
      type: [this.user['type']]
    });

  }

  private createUserForm(): void {
    this.personalInfoForm = this.formbuilder.group({
      name: [this.user.name, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName],
      docId: [this.user.docId],
      birthDay: [this.user.birthDay],
      gender: [this.user.gender]
    });
  }

  private createAddressForm(): void {
    this.addressForm = this.formbuilder.group({
      street: [this.user.address.street],
      door: [this.user.address.door],
      no: [this.user.address.no],
      city: [this.user.address.city],
       zipCode: new FormControl(this.user.address.zipCode, Validators.pattern(/^[0-9]{5,5}$/))
      // [this.user.address.zipCode,[
      //   Validators.minLength(5), Validators.maxLength(5), Validators.required]]
    })
  }

  public createPatientForm(): void {
    this.createUserForm();

    this.createAddressForm();

    this.patientForm = this.formbuilder.group({
      NHC: [this.user['NHC'], Validators.required]
    });
  }

  public allowOnlyNumbers(event:KeyboardEvent):void{
    if((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 9 && event.keyCode !== 8){
      event.preventDefault();
    }
  }

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
    this.user['insuranceCarrier'] = [];
    insurancesKeys.forEach((key) => {
      if (key == "NHC") {
        this.user['NHC'] = this.patientForm.value['NHC'];
      }
      else {
        this.user['insuranceCarrier'].push(this.patientForm.value[key]);
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

  public loadCities(): Observable<string[]> {
    return this.http.get("../../assets/cities.json").pipe(map((res) => {
      return res["cities"];
    }));
  }

  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value);
  }

  onlyNumber(c: FormControl) {
    let REGEXP = new RegExp(/^[0-9]*$/);

    return REGEXP.test(c.value);
  }

}
