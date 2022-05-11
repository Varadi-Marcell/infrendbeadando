import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {UserComponent} from "./user/user.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {VechilesComponent} from "./vechiles/vechiles.component";
import {VechileDetailsResolver} from "./services/vechile-details.resolver";
import {VechileDetailsComponent} from "./vechiles/vechile-details/vechile-details.component";
import {AddVechileComponent} from "./vechiles/add-vechile/add-vechile.component";
import {UpdatevechileComponent} from "./vechiles/updatevechile/updatevechile.component";
import {UserDetailsComponent} from "./user/user-details/user-details.component";
import {UserDetailsResolver} from "./services/user-details.resolver";
import {UpdateUserComponent} from "./user/update-user/update-user.component";
import {RentComponent} from "./rent/rent.component";
import {EndOfRentComponent} from "./rent/end-of-rent/end-of-rent.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'vechiles' },
  { path: 'user', component: UserComponent },
  { path: 'userAdd', component: AddUserComponent },
  {path: 'user/:id', component: UserDetailsComponent, resolve: {preload: UserDetailsResolver}},
  {path: 'user-update/:id', component: UpdateUserComponent, resolve: {preload: UserDetailsResolver}},
  { path: 'vechiles', component: VechilesComponent },
  { path: 'rent', component: RentComponent },
  { path: 'end-of-rent', component: EndOfRentComponent },
  { path: 'addVechiles', component: AddVechileComponent },
  { path: 'updateVechile', component: UpdatevechileComponent },
  {path: 'vechile/:id', component: VechileDetailsComponent, resolve: {preload: VechileDetailsResolver}},
  {path: 'vechile-update/:id', component: UpdatevechileComponent, resolve: {preload: VechileDetailsResolver}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
