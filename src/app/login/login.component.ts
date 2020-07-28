import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/app-user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUserService } from '../services/app-user.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = "";
  user: AppUser = new AppUser();
  constructor(private router: Router, private _snackBar: MatSnackBar, private appUserService: AppUserService, private userService: UserService) { }

  ngOnInit(): void {
  }

  logUser() {
    this.appUserService.LogUser(this.user).subscribe(
      (success) => {
        if (success) {
          this._snackBar.open("Entrada Exitosa", "Aceptar", {
            duration: 2000,
          });
          var beforeRoute = this.userService.currentRoute;
          beforeRoute = beforeRoute ? beforeRoute : "users";
          this.router.navigate([beforeRoute]);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = "Nombre de usuario o contraseña incorrecta";
        }
        else {
          this.router.navigate(["error"]);
        }
      });
  }
}
