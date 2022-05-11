import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {VechileService} from "../../services/vechile.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role, User} from "../../models/User";
import {Vechile} from "../../models/Vechile";

export enum Broken {Yes = "yes", No = "no"};

@Component({
  selector: 'app-end-of-rent',
  templateUrl: './end-of-rent.component.html',
  styleUrls: ['./end-of-rent.component.css']
})


export class EndOfRentComponent implements OnInit {
  brokenProperty: Array<string> = Object.keys(Broken).filter(key => isNaN(+key));

  userForm: any;
  users: User[] = [];
  vechiles: Vechile[] = [];
  vechileValues!: FormControl;
  userIdValue!: FormControl;
  kilometers!: FormControl;
  days!: FormControl;
  userIdList: Array<number> = [];
  vechileIdList: Array<number> = [];
  list: Array<FormControl> = [];
  isDisabled!: true;
  submitted = false;
  isBroken!: FormControl;

  constructor(private userService: UserService,
              private vechileService: VechileService,
              public router: Router,
              private fb: FormBuilder,
              private ngZone: NgZone) {
  }

  async ngOnInit() {
    try {
      this.userService.getUsersByVechiles().subscribe(data => this.users = data);
      this.vechiles = await this.vechileService.getAll();
    } catch (err) {
      console.log(err);
    }
    this.userForm = this.fb.group({
      userId: ['', [Validators.required]],
      vechileId: ['', [Validators.required]],
      days: ['', [Validators.required]],
      kilometers: ['', [Validators.required]],
      isBroken: ['', [Validators.required]],

    });
    this.vechileValues = this.userForm.controls['vechileId'] as FormControl;
    this.userIdValue = this.userForm.controls['userId'] as FormControl;
    this.isBroken = this.userForm.controls['isBroken'] as FormControl;
    this.kilometers = this.userForm.controls['kilometers'] as FormControl;
    this.days = this.userForm.controls['days'] as FormControl;

    this.fillUserId();
  }

  fillUserId() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].vechiles.length >= 1) {
        this.userIdList.push(this.users[i].id);
      }
    }
  }

  fillVechileId() {
    this.vechileIdList = [];
    for (let i = 0; i < this.users.length; i++) {
      if (this.userIdValue.value === this.users[i].id) {
        for (let j = 0; j < this.users[i].vechiles.length; j++) {
          this.vechileIdList.push(this.users[i].vechiles[j].id);
        }
      }

    }
  }

  getVechile(): Vechile {
    let temp!: any;
    for (let i = 0; i < this.vechiles.length; i++) {
      if (this.vechileValues.value === this.vechiles[i].id) {
        temp = this.vechiles[i];
      }
    }
    return temp;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.userForm.valid) {
      return false;
    } else {
      return this.userService.endOfRent(this.userIdValue.value, this.vechileValues.value, this.kilometers.value).subscribe({
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }
}
