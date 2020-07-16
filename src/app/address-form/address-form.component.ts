import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss' ,'../user-details/user-details.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input() isEditable: boolean = true;
  @Input() addressFormGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
