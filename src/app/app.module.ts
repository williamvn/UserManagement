import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { NewUserComponent } from './new-user/new-user.component';
import { DialogComponent } from './dialog/dialog.component';
import { PersonalInfoFormComponent } from './forms/personal-info-form/personal-info-form.component';
import { AddressFormComponent } from './forms/address-form/address-form.component';
import { ProfessionalFormComponent } from './forms/professional-form/professional-form.component';
import { PatientFormComponent } from './forms/patient-form/patient-form.component';
import { QueryValidatorDirective } from './query-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    UsersListComponent,
    UsersComponent,
    UserDetailsComponent,
    NewUserComponent,
    DialogComponent,
    PersonalInfoFormComponent,
    AddressFormComponent,
    ProfessionalFormComponent,
    PatientFormComponent,
    QueryValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
