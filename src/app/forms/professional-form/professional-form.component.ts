import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.scss','../../user-details/user-details.component.scss']
})
export class ProfessionalFormComponent implements OnInit {

  @Input() isEditable: boolean = true;
  @Input() professionalForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
