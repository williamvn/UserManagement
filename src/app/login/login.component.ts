import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/app-user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: AppUser = new AppUser();
  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logUser() {
    this._snackBar.open("Usuario Registrado Satisfactoriament", "Aceptar", {
      duration: 2000,
    });
    this.router.navigate(["users"]);
  }
}
