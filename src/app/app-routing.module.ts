import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "users", component: UsersComponent },
  { path: "error", component: ErrorComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "user/new", component: NewUserComponent },
  { path: "user/edit/:userType/:id", component: UserDetailsComponent },
  { path: "user/new/:userType", component: NewUserComponent },
  { path: "user/:userType/:id", component: UserDetailsComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
