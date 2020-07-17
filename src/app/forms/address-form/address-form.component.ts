import { Component, OnInit, Input } from '@angular/core';
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
export class AddressFormComponent implements OnInit {

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

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
