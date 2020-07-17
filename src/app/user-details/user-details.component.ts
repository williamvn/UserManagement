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
  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];
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
    this.loading = true;
    this.route.url.subscribe((segments) => {
      this.formService.isEditable = (segments.find(s => s.path == "edit") !== undefined);
    });

    this.route.paramMap.subscribe(params => {
      var userType = params.get('userType');
      var id = +params.get('id');
      this.loadUser(id, userType);
    });
  }

  private loadUser(id: number, userType: string): void {
    if (userType == "professional") {
      this.user = this.userService.professionals.find(pro => pro.id == id);
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
      this.user = this.userService.patients.find(patient => patient.id == id);
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
      alert("Error loading the user with ID:" + id);
    }
  }

  private getUserbyId(id: number) {
    var resource: Resource = this.formService.isProfessional ? "professionals" : "patients";
    this.userService.getUserById(id, resource).subscribe(response => {
      this.user = response[0];
      this.formService.user = this.user;
      if (this.formService.isProfessional) {
        this.formService.createProfessionalForm();
      }
      else {
        this.formService.createPatientForm();
      }
      this.loadForms();
    });
  }

  loadForms() {
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
    this.userService.updateUser(this.user, resource).subscribe((res => {
      this.router.navigate(["users"]);
      this._snackBar.open("Usuario Actualizado", "Aceptar", {
        duration: 2000,
      });
    }));
  }
}
