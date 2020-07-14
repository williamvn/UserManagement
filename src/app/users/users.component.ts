import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { Patient } from '../model/patient';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  professionals: Professional[];
  patients: Patient[];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.loadUsers().subscribe(
      success => {
        if (success) {
          this.professionals = this.service.professionals;
          
          this.patients = this.service.patients;
          
          this.users = this.professionals;
          this.users = this.users.concat(this.patients);
        }
        else {
          alert("Error Loading the Users");
        }
    });
  }
}
