import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { Address } from '../model/Address';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceCarrier } from '../model/insurance-carrier';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormsService } from '../services/forms.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [FormsService]
})
export class NewUserComponent implements OnInit {

  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  patientForm: FormGroup;
  professionalForm: FormGroup;

  type: string;
  isTypeSelected: boolean;
  user: User;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public formService: FormsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var userType = params.get('userType');
      this.isTypeSelected = (userType != undefined);
      var addr = new Address();
      if (userType === "professional") {
        this.formService.isProfessional = true;
        this.type = "Profesional";
        this.user = new Professional();
        this.user.address = addr;
        this.formService.user = this.user;
        this.formService.createProfessionalForm();
      }
      else if (userType === "patient") {
        this.formService.isProfessional = false;
        this.type = "Paciente";
        this.user = new Patient();
        this.user['insuranceCarrier'] = []
        this.user.address = addr;
        this.formService.user = this.user;
        this.formService.createPatientForm();
      }
      this.loadForms()
    });
  }

  private loadForms() {
    this.personalInfoForm = this.formService.personalInfoForm;
    this.addressForm = this.formService.addressForm;
    this.patientForm = this.formService.patientForm;
    this.professionalForm = this.formService.professionalForm;
  }


  saveUser() {
    console.log(this.user);
    this.formService.getUser();
    this.userService.addNewUser(this.user, this.formService.isProfessional ? "professionals" : "patients").subscribe(() => {
      this._snackBar.open("Usuario Agregado", "Aceptar", {
        duration: 2000,
      });
      this.router.navigate(["users"]);
    });
  }
}
