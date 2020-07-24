import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  professionals: Professional[];
  patients: Patient[];
  query: string = "";

  private _professionalsBackup: Professional[];
  private _patientsBackup: Patient[];
  advancedQuery: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private userService: UserService,
              public dialog: MatDialog, 
              private _snackBar: MatSnackBar, 
              private breakpointObserver: BreakpointObserver,
              private router:Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.loadUsers().subscribe(
      success => {
        if (success) {
          this.loadCollections();
        }
        else {
          alert("Error Loading the Users");
        }
      },
      error => {
        this._snackBar.open("La conexión con la base de datos ha fallado", "Cerrar", {
          duration: 5000,
        });
      });
  }

  private loadCollections(): void {
    this.professionals = this.userService.professionals;
    this.patients = this.userService.patients;
    this.users = this.professionals;
    this.users = this.users.concat(this.patients);
    //Backup
    this._professionalsBackup = this.professionals;
    this._patientsBackup = this.patients;
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
          (error) => {this.router.navigate(["error"]) }
        );
      }
    });
  };

  sendQuery() {
    this.userService.sendQuery(this.query).subscribe(
      (success) => {
        if (success) {
          this.loadCollections();
        }
        else {
          alert("Error While loading users");
        }
      }
    );
  }

  filterUsers() {
    if (!this.query) {
      this.loadCollections();
    }
    this.professionals = this._professionalsBackup.filter(professional => professional.name.includes(this.query));
    this.patients = this._patientsBackup.filter(patient => patient.name.includes(this.query));
    this.users = this.professionals;
    this.users = this.users.concat(this.patients);
  }

  resetQuery(): void {
    if (!this.query) {
      this.loadUsers();
    }
  }
}
