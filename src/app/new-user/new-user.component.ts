import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { Address } from '../model/Address';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { UserService, Resource } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


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
  isTypeSelected: boolean = false;
  user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public formService: FormsService,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.userService.currentRoute = this.router.url;
    if (this.userService.loginRequired) {
      this.router.navigate([""]);
    }
    else {
      this.route.paramMap.subscribe(params => {
        var userType = params.get('userType');
        var addr = new Address();
        if (!userType) {
          this.isTypeSelected = false;
        }
        else if (userType === "professional") {
          this.formService.isProfessional = true;
          this.isTypeSelected = true;
          this.type = "Profesional";
          this.user = new Professional();
          this.user.address = addr;
          this.formService.user = this.user;
          this.formService.createProfessionalForm();
        }
        else if (userType === "patient") {
          this.formService.isProfessional = false;
          this.isTypeSelected = true;
          this.type = "Paciente";
          this.user = new Patient();
          this.user['insuranceCarriers'] = [];
          this.user.address = addr;
          this.formService.user = this.user;
          this.formService.createPatientForm();
        }
        else {
          this.router.navigate(["not-found"]);
          return;
        }
        this.loadForms()
      });
    }
  }

  private loadForms() {
    this.personalInfoForm = this.formService.personalInfoForm;
    this.addressForm = this.formService.addressForm;
    this.patientForm = this.formService.patientForm;
    this.professionalForm = this.formService.professionalForm;
  }

  saveUser() {
    this.formService.getUser();
    this.userService.addNewUser(this.user, this.formService.isProfessional ? "professionals" : "patients").subscribe(
      (success) => {
        this._snackBar.open("Usuario Agregado", "Aceptar", {
          duration: 2000,
        });
        this.router.navigate(["users"]);
      },
      (error) => {
        this.router.navigate(["error"]);
      });
  }
}
