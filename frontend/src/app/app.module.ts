import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './user/add-user/add-user.component';
import { VechilesComponent } from './vechiles/vechiles.component';
import { NavbarComponent } from './navbar/navbar.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { VechileDetailsComponent } from './vechiles/vechile-details/vechile-details.component';
import { AddVechileComponent } from './vechiles/add-vechile/add-vechile.component';
import { UpdatevechileComponent } from './vechiles/updatevechile/updatevechile.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { RentComponent } from './rent/rent.component';
import { EndOfRentComponent } from './rent/end-of-rent/end-of-rent.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UserComponent,
    AddUserComponent,
    VechilesComponent,
    NavbarComponent,
    VechileDetailsComponent,
    AddVechileComponent,
    UpdatevechileComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    RentComponent,
    EndOfRentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatGridListModule,
    Ng2SearchPipeModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
