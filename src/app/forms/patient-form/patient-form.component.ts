import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { InsuranceCarrier } from '../../model/insurance-carrier';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss','../forms.component.scss']
})
export class PatientFormComponent implements OnInit {

  @Input() isEditable:boolean = true;
  @Input() patientForm:FormGroup;
  @Input() insuranceCarriers:InsuranceCarrier[] = [];
  insuranceForms: FormGroup[] = [];
  insuranceFormsNames:string[] = [];
  insuranceId:number = 0;
  constructor(private _snackBar: MatSnackBar, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createInsuranceControls();
  }

  private createInsuranceControls(){
    for (let i = 0; i < this.insuranceCarriers.length; i++) {
      var form: FormGroup = this.formbuilder.group({
        name: this.insuranceCarriers[i].name,
        type: this.insuranceCarriers[i].type,
        cardNumber: this.insuranceCarriers[i].cardNumber
      });
      this.insuranceForms.push(form);
      this.patientForm.addControl("insurance" + this.insuranceId, form);
      this.insuranceFormsNames.push("insurance" + this.insuranceId);
      this.insuranceId += 1
    }
  }

  addInsurance() {
    var form: FormGroup = this.formbuilder.group({
      name: "",
      type: "",
      cardNumber: ""
    });
    this.insuranceForms.push(form);
    this.patientForm.addControl("insurance" + this.insuranceId, form);
    this.insuranceFormsNames.push("insurance" + this.insuranceId);
    this.insuranceId += 1;
  }

  deleteInsurance(form:FormGroup) {
    var index = this.insuranceForms.findIndex( i => i === form); 

    this.insuranceForms.splice(index, 1);
    var name = this.insuranceFormsNames[index];
    this.insuranceFormsNames.splice(index, 1);

    this.patientForm.removeControl(name);

    var snackBarRef = this._snackBar.open("Seguro Eliminado", "UNDO", {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.insuranceForms.splice(index, 0, form);
      this.insuranceFormsNames.splice(index, 0, name);
      this.patientForm.addControl(name, form);
    });
  }
}
