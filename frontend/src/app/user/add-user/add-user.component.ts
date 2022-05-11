import { Component, OnInit, NgZone } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Role, User} from "../../models/User";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  roleProperty: Array<string> = Object.keys(Role).filter(key => isNaN(+key));

  submitted = false;
  userForm!: FormGroup;
  userProfile: any = ['Admin','User'];
  roleType!: FormControl;

  constructor(public fb: FormBuilder,
              public userService: UserService,
              public ngZone:NgZone,
              public router:Router
              ) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      address: ['', [Validators.required]],
      permission: ['', [Validators.required]],
    });
    this.roleType = this.userForm.controls['permission'] as FormControl;

  }




  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      const user = this.userForm.value;
      return this.userService.createUser(user).subscribe({
        complete: () => {
          console.log('User successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/user'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }



}
