import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  }

}
