import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss','../forms.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {

  @Input() isEditable:boolean = true;
  @Input() personalUserForm:FormGroup;
  constructor() {
   }

  ngOnInit(): void {
  }

}
