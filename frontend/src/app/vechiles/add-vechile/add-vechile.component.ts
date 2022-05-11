import {Component, NgZone, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VechileService} from "../../services/vechile.service";
import {Fuel, Status, Type, Vechile} from "../../models/Vechile";

@Component({
  selector: 'app-add-vechile',
  templateUrl: './add-vechile.component.html',
  styleUrls: ['./add-vechile.component.css']
})
export class AddVechileComponent implements OnInit {

  //typeProperty! : Type;
  typeProperty: Array<string> = Object.keys(Type).filter(key => isNaN(+key));
  fuelProperty: Array<string> = Object.keys(Fuel).filter(key => isNaN(+key));
  statusProperty: Array<string> = Object.keys(Status).filter(key => isNaN(+key));

  submitted = false;
  vechileForm!: FormGroup;
  vechileType!: FormControl;
  vechileFuel!: FormControl;
  vechileStatus!:FormControl;

  constructor(public fb: FormBuilder,
              public vechileService: VechileService,
              public ngZone:NgZone,
              public router:Router
  ) {
  }

  ngOnInit(): void {
    this.vechileForm = this.fb.group({
      //platenumber: ['', [Validators.required]],
      platenumber:['', Validators.compose([Validators.pattern('[a-zA-Z]{3}-[0-9]{3}'), Validators.required])],
      chassisnumber: ['', [Validators.required]],
      date: ['', [Validators.required]],
      name:['',Validators.compose([Validators.required])],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      kilometers: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      fuel: ['', [Validators.required]],
    });
    this.vechileType = this.vechileForm.controls['type'] as FormControl;
    this.vechileFuel = this.vechileForm.controls['fuel'] as FormControl;
    this.vechileStatus = this.vechileForm.controls['status'] as FormControl;
  }

  get checker(): { [key: string]: AbstractControl } {
    return this.vechileForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (!this.vechileForm.valid) {
      return false;
    } else {
      const vechile = this.vechileForm.value;
      return this.vechileService.createVechile(vechile).subscribe({
        complete: () => {
          console.log('Vechile successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/vechiles'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }

}
