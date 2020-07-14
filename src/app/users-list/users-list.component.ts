import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {

  @Input() displayedColumns: string[];
  @Input() users: User[] = [];
  dataSource = new MatTableDataSource(this.users);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.users !== undefined){
      this.dataSource = new MatTableDataSource(this.users);
    }
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}