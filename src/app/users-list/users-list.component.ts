import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface A{
  name:string;
}

interface B extends A{
  age:number;
}


interface C extends A{
  lastname:string;
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Apellido', 'NHC', 'Rol'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    var b:B = {name:"Will", age:23}
    var c:C = {name:"Will", lastname:"V"}
    var a:B|C = c;
    console.log(a.lastname);
  }

}
