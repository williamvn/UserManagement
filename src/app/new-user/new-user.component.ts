import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { Address } from '../model/Address';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceCarrier } from '../model/insurance-carrier';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  isProfessional:boolean;
  isTypeSelected:boolean;
  user:User;
  constructor(private route: ActivatedRoute, private userService:UserService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var userType = params.get('userType');
      this.isTypeSelected = (userType != undefined);
      var addr = new Address();
      if(userType == "professional"){
        this.isProfessional = true;
        this.user = new Professional();
        this.user.address = addr;
      }
      else if(userType=="patient"){
        this.isProfessional = false;
        this.user = new Patient();
        this.user['insuranceCarrier'] = []
        this.user.address = addr;
      }
    });
  }

  saveUser(){
    console.log(this.user);
    this.userService.addNewUser(this.user, this.isProfessional?"professionals":"patients").subscribe(()=>
    {
      this._snackBar.open("Usuario Agregado", "Aceptar", {
        duration: 2000,
      });
      this.router.navigate(["users"]);
    });
  }

  deleteInsurance(index:number){
    var insurance = this.user["insuranceCarrier"][index];
    this.user["insuranceCarrier"].splice(index, 1);
    var snackBarRef = this._snackBar.open("Seguro Eliminado", "UNDO", {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.user["insuranceCarrier"].splice(index, 0, insurance);
    });

  }
  addInsurance(){
    var newInsurance = new InsuranceCarrier();
    this.user["insuranceCarrier"].push(newInsurance);
  }

}
