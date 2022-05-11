import { Component, OnInit } from '@angular/core';
import {Vechile} from "../../models/Vechile";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vechile-details',
  templateUrl: './vechile-details.component.html',
  styleUrls: ['./vechile-details.component.css']
})
export class VechileDetailsComponent implements OnInit {

  vechile!: Vechile;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.vechile = this.activatedRoute.snapshot.data['preload'];
  }

}
