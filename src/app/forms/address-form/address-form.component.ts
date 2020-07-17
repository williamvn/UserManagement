import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/app/services/forms.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss' ,'../../user-details/user-details.component.scss'],
  providers:[FormsService]
})
export class AddressFormComponent implements OnInit, DoCheck {

  @Input() isEditable: boolean = true;
  @Input() addressFormGroup: FormGroup;
  cities:string[] = [];
  filteredOptions: Observable<string[]>;
  constructor(private formService: FormsService) { }

  ngOnInit(): void {
    this.formService.loadCities().subscribe((cities) => {
      this.cities = cities;
    });
    this.filteredOptions = this.addressFormGroup.get("city").valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  ngDoCheck(){
    console.log(this.addressFormGroup.get("zipCode"));
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onzipCodeInput(event:KeyboardEvent):void{
    this.formService.allowOnlyNumbers(event);
  }

}
