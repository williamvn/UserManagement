import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "user/edit/:userType/:id", component: UserDetailsComponent },
  { path: "user/new", component: NewUserComponent },
  { path: "user/new/:userType", component: NewUserComponent },
  { path: "user/:userType/:id", component: UserDetailsComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
