import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { Address } from '../model/Address';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceCarrier } from '../model/insurance-carrier';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  isProfessional: boolean;
  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  patientForm: FormGroup;
  professionalForm: FormGroup;
  type: string;
  isTypeSelected:boolean;
  user:User;
  constructor(private route: ActivatedRoute, private userService:UserService, private _snackBar: MatSnackBar, private router: Router, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var userType = params.get('userType');
      this.isTypeSelected = (userType != undefined);
      var addr = new Address();
      if(userType == "professional"){
        this.isProfessional = true;
        this.type = "Profesional";
        this.user = new Professional();
        this.user.address = addr;
        this.createProfessionalForm();
      }
      else if(userType=="patient"){
        this.isProfessional = false;
        this.type = "Paciente";
        this.user = new Patient();
        this.user['insuranceCarrier'] = []
        this.user.address = addr;
        this.createPatientForm();
      }
    });
  }

  saveUser(){
    console.log(this.user);
    this.getUser();
    this.userService.addNewUser(this.user, this.isProfessional?"professionals":"patients").subscribe(()=>
    {
      this._snackBar.open("Usuario Agregado", "Aceptar", {
        duration: 2000,
      });
      this.router.navigate(["users"]);
    });
  }

  createProfessionalForm(): void {
    this.createUserForm();
    this.createAddressForm();
    this.professionalForm = this.formbuilder.group({
      noCollegiate: [this.user['noCollegiate']],
      type: [this.user['type']]
    });
  }

  createUserForm(): void {
    this.personalInfoForm = this.formbuilder.group({
      name: [this.user.name],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      docId: [this.user.docId],
      birthDay: [this.user.birthDay],
      gender: [this.user.gender]
    });
  }

  createAddressForm(): void {
    this.addressForm = this.formbuilder.group({
      street: [this.user.address.street],
      door: [this.user.address.door],
      no: [this.user.address.no],
      city: [this.user.address.city],
      zipCode: [this.user.address.zipCode]
    })
  }

  createPatientForm(): void {
    this.createUserForm();

    this.createAddressForm();

    this.patientForm = this.formbuilder.group({
      NHC: [this.user['NHC']]
    });
  }

  private getUser(): void {
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
    var insurancesKeys:string[] = Object.keys(this.patientForm.getRawValue());
    this.user['insuranceCarrier'] = [];
    insurancesKeys.forEach((key)=>{
      if(key == "NHC"){
        this.user['NHC'] = this.patientForm.value['NHC'];
      }
      else{
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

}
