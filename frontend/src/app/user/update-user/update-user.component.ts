import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Role, User} from "../../models/User";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  roleProperty: Array<string> = Object.keys(Role).filter(key => isNaN(+key));

  submitted = false;
  userForm!: FormGroup;
  userProfile: any = ['Admin','User'];
  user!: User;
  roleType!: FormControl;

  constructor(private activatedRoute: ActivatedRoute,
              public fb: FormBuilder,
              public userService: UserService,
              public ngZone:NgZone,
              public router:Router) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['preload'];

    this.userForm = this.fb.group({
      id: [this.user.id, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      age: [this.user.age, [Validators.required]],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      address: [this.user.address, [Validators.required]],
      permission: [this.user.permission, [Validators.required]],
    });
    this.roleType = this.userForm.controls['permission'] as FormControl;

  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      const user = this.userForm.value;
      return this.userService.updateUser(user).subscribe({
        complete: () => {
          console.log('User successfully updated!'),
            this.ngZone.run(() => this.router.navigateByUrl('/user'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }
}
