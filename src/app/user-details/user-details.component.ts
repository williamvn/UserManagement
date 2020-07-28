import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../model/user';
import { UserService, Resource } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormsService } from '../services/forms.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [FormsService]
})
export class UserDetailsComponent implements OnInit {

  user: User;

  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  patientForm: FormGroup;
  professionalForm: FormGroup;
  userForm: FormGroup;

  loading: boolean = true;
  type: string;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public formService: FormsService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.userService.currentRoute = this.router.url;
    if (this.userService.loginRequired) {
      this.router.navigate([""]);
    }
    else {
      this.loading = true;
      this.route.url.subscribe((segments) => {
        this.formService.isEditable = (segments.find(s => s.path == "edit") !== undefined);
      });

      this.route.paramMap.subscribe(params => {
        var userType = params.get('userType');
        var id: string = params.get('id');
        if (id == undefined) {
          this.router.navigate(["not-found"]);
        }
        else {
          this.loadUser(id, userType);
        }
      });
    }
  }

  private loadUser(id: string, userType: string): void {
    if (userType == "professional") {
      this.user = this.userService.professionals.find(pro => pro._id == id);
      this.formService.isProfessional = true;
      this.type = "Profesional";
      if (!this.user) {
        //No Cache
        this.getUserbyId(id);
      }
      else {
        this.formService.user = this.user;
        this.formService.createProfessionalForm();
        this.loadForms();
      }
    }
    else if (userType == "patient") {
      this.user = this.userService.patients.find(patient => patient._id == id);
      this.formService.isProfessional = false;
      this.type = "Paciente";
      if (!this.user) {
        //No Cache
        this.getUserbyId(id);
      }
      else {
        this.formService.user = this.user;
        this.formService.createPatientForm();
        this.loadForms();
      }
    }
    else {
      this.router.navigate(["not-found"]);
    }
  }

  private getUserbyId(id: string) {
    var resource: Resource = this.formService.isProfessional ? "professionals" : "patients";
    this.userService.getUserById(id, resource).subscribe(
      response => {
        this.user = response;
        this.formService.user = this.user;
        if (this.formService.isProfessional) {
          this.formService.createProfessionalForm();
        }
        else {
          this.formService.createPatientForm();
        }
        this.loadForms();
      },
      error => {
        if (error.status === 400) {
          this.router.navigate(["not-found"]);
        }
        else {
          this.router.navigate(["error"]);
        }
      }
    );
  }

  private loadForms() {
    this.loading = false;
    this.personalInfoForm = this.formService.personalInfoForm;
    this.addressForm = this.formService.addressForm;
    this.patientForm = this.formService.patientForm;
    this.professionalForm = this.formService.professionalForm;
    this.userForm = this.formbuilder.group({
      personalInfo: [this.personalInfoForm],
      addressForm: [this.addressForm],
      professionalForm: [this.professionalForm]
    });
  }

  saveUser() {
    this.formService.getUser();
    var resource: Resource = this.formService.isProfessional ? "professionals" : "patients";
    this.userService.updateUser(this.user, resource).subscribe(
      response => {
        this.router.navigate(["users"]);
        this._snackBar.open("Usuario Actualizado", "Aceptar", {
          duration: 2000,
        });
      },
      (error) => {
        if (error.status == 401) {
          //Unauthorized
          this.router.navigate([""]);
        }
        else{
          this.router.navigate(["error"]);
        }
      }
    );
  }
}
