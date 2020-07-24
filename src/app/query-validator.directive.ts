import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors, Validators, AbstractControl } from '@angular/forms';


  const FILTERS: string[] = [
    "name",
    "lastName",
    "secondLastName",
    "noCollegiate",
    "documentationId",
    "type",
    "NHC",
    "gender"
  ];

@Directive({
  selector: '[QueryValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: QueryValidatorDirective, multi: true }]
})
export class QueryValidatorDirective implements Validator {
  constructor() {
  }
  validate(control: AbstractControl): ValidationErrors {
    let result: boolean = true;
    let query: string = control.value;
    if(!query){
      return null;
    }
    let filters = query.split("&");
    for (let i = 0; i < filters.length; i++) {
      let field: string = filters[i].split("=")[0];
      if (field == "insuranceCarriers" || filters[i] == "address") {
        result = false;
        break;
      }
      if (!FILTERS.find(s => s == field)) {
        result = false;
        break;
      }
    }
    const message = {
      'InvalidQuery': {
        'message': 'Invalid Query'
      }
    }
    return result ? null: message;
  }
}
