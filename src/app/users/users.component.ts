import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  professionals: Professional[];
  patients: Patient[];

  constructor(private userService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.userService.loadUsers().subscribe(
      success => {
        if (success) {
          this.professionals = this.userService.professionals;

          this.patients = this.userService.patients;

          this.users = this.professionals;
          this.users = this.users.concat(this.patients);
        }
        else {
          alert("Error Loading the Users");
        }
      });
  }

  deleteDoctors() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: "Eliminar Médicos", subtitle: "Esta operación eliminará a todos los médicos", body: "¿Estás seguro?", reject: "No", accept: "Sí" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteAllDoctors().subscribe(
          (res) => {
            this._snackBar.open("Todos los médicos han sido borrados", "Cerrar", {
              duration: 5000,
            });
          },
          (error) => { console.log(error) }
        );
      }
    });
  };
}
