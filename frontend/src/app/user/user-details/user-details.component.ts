import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {ActivatedRoute} from "@angular/router";
import {Vechile} from "../../models/Vechile";
import {VechileService} from "../../services/vechile.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user!: User;

  constructor(private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['preload'];
    console.log(this.user);
  }

}
