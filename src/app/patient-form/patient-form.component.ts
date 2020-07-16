import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  @Input() isEditable:boolean;
  @Input() patientForm:FormGroup;
  @Input() insurances: FormControl[];
  @Output() deleteInsurance = new EventEmitter<number>();
  @Output() addInsurance = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onAddInsurance(){
    this.addInsurance.emit();
  }

  onDeleteInsurance(index:number){
    this.deleteInsurance.emit(index);
  }

}
