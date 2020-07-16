import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceCarrier } from '../model/insurance-carrier';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
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
  isProfessional: boolean;
  isEditable: boolean;
  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  patientForm: FormGroup;
  professionalForm: FormGroup;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private _snackBar: MatSnackBar, private formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      this.isEditable = (segments.find(s => s.path == "edit") !== undefined);
    });

    this.route.paramMap.subscribe(params => {
      var userType = params.get('userType');
      var id = +params.get('id');
      if (userType == "professional") {
        this.user = this.userService.professionals.find(pro => pro.id == id);
        this.createProfessionalForm();
        this.isProfessional = true;
      }
      else if (userType == "patient") {
        this.isProfessional = true;
        this.user = this.userService.patients.find(patient => patient.id == id);
        console.log(this.user['insuranceCarrier'].name);
      }
      else {
        alert("Error loading the user with ID:" + id);
      }
    });
  }

  saveUser() {
    this.userService.updateUser(this.user, this.isProfessional);
    this.router.navigate(["users"]);
    this._snackBar.open("Usuario Actualizado", "Aceptar", {
      duration: 2000,
    });
  }

  deleteInsurance(index: number) {
    var insurance = this.user["insuranceCarrier"][index];
    this.user["insuranceCarrier"].splice(index, 1);
    var snackBarRef = this._snackBar.open("Seguro Eliminado", "UNDO", {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.user["insuranceCarrier"].splice(index, 0, insurance);
    });

  }

  addInsurance() {
    var newInsurance = new InsuranceCarrier();
    this.user["insuranceCarrier"].push(newInsurance);
  }

  createProfessionalForm():void{
    this.createUserForm();
    this.createAddressForm();
    this.professionalForm = this.formbuilder.group({
      noCollegiate:[this.user['noCollegiate']],
      type:[this.user['type']]
    });
  }

  createUserForm():void{
    this.personalInfoForm = this.formbuilder.group({
      name:[this.user.name],
      firstName:[this.user.firstName],
      lastName:[this.user.lastName],
      docId:[this.user.docId],
      birthDay:[this.user.birthDay],
      gender:[this.user.gender]
    })
  }

  createAddressForm():void{
    this.addressForm = this.formbuilder.group({
      street:[this.user.address.street],
      door:[this.user.address.door],
      no:[this.user.address.no],
      city:[this.user.address.city],
      zipCode:[this.user.address.zipCode]
    })
  }
}
