import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public users : User[]=[];
  filterTerm!: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }
  delete(id:any){
    console.log("ASD");
    this.userService.deleteUserById(id);
    window.location.reload();
  }
}
