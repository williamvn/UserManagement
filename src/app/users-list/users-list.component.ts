import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../model/user';
import { MatPaginator } from '@angular/material/paginator';
import { Professional } from '../model/professional';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {

  @Input() displayedColumns: string[];
  @Input() columnsNames: string[];
  @Input() users: User[] = [];
  dataSource = new MatTableDataSource(this.users);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.users !== undefined) {
      this.dataSource = new MatTableDataSource(this.users);
    }
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  deleteUser(user) {
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      width: '250px'
    });
    var isProfessional = (<Professional>user).noCollegiate != undefined;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id, isProfessional ? "professionals" : "patients").subscribe(() => {
          this._snackBar.open("Usuario Eliminado", "Aceptar", {
            duration: 5000,
          });
        });
      }
    });
  }
}

@Component({
  selector: 'delete-user-dialog',
  styleUrls: ['./delete-user-dialog.scss'],
  templateUrl: 'delete-user-dialog.html',
})
export class DeleteUserDialog {

  constructor(public dialogRef: MatDialogRef<UsersListComponent>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onClick(): void {
    this.dialogRef.close(true);
  }
}