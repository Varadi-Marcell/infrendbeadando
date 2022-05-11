import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {VechileService} from "../services/vechile.service";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {Vechile} from "../models/Vechile";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  userForm: any;
  users: User[]=[];
  vechiles: Vechile[]=[];

  list: Array<FormControl>=[];
  vechileValues!: FormControl;
  userIdValue!: FormControl;

  userIdList: Array<number>=[];
  vechileIdList: Array<number>=[];

  isDisabled!: true;
  submitted = false;

  constructor( private userService: UserService,
               private vechileService: VechileService,
               public router:Router,
               private fb: FormBuilder,
               public ngZone:NgZone,


  ) { }

  async ngOnInit() {

    try {
      this.userService.getUsersByVechiles().subscribe(data => this.users = data);
      this.vechiles = await this.vechileService.getAll();
    } catch (err) {
      console.log(err);
    }
    this.userForm = this.fb.group({
      userId: ['', [Validators.required]],
      quantities: this.fb.array([],) ,
    });
    this.vechileValues = this.userForm.controls['vechileId'] as FormControl;
    this.userIdValue = this.userForm.controls['userId'] as FormControl;

   this.fillUserId();
   this.fillVechileId();
  }

  quantities() : FormArray {
    return this.userForm.get("quantities") as FormArray
  }

  getUserPermission() : string{
    let a!: string;
    for (let i = 0; i < this.users.length; i++) {
      if(this.userIdValue.value === this.users[i].id){
       a = this.users[i].permission;
      }
    }
    return a;
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      qty: ''

    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  fillUserId(){
    for (let i = 0; i < this.users.length; i++) {
       if(!(this.users[i].vechiles.length.valueOf() >= 1)){
         this.userIdList.push(this.users[i].id);
       }
    }
  }

  fillVechileId(){
    for (let i = 0; i < this.vechiles.length; i++) {
      if(this.vechiles[i].status.valueOf() === "Yes"){
        this.vechileIdList.push(this.vechiles[i].id);
      }
    }
  }

  onSubmit() {
    let array = this.userForm.value.quantities;
    let vechileIdArray : Number[]=[];
    for (let i = 0; i < array.length; i++) {
      vechileIdArray.push(array[i].qty);
    }
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      return this.userService.addVechilesToUser(this.userForm.value.userId,vechileIdArray).subscribe({
        complete: () => {
            this.ngZone.run(() => this.router.navigateByUrl('/users'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }
}
