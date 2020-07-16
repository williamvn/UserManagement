import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss', '../user-details/user-details.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {

  @Input() isEditable:boolean = false;
  @Input() personalUserForm:FormGroup;
  constructor() {
   }

  ngOnInit(): void {
  }

}
