import {Component, NgZone, OnInit} from '@angular/core';
import {Fuel, Status, Type, Vechile} from "../../models/Vechile";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VechileService} from "../../services/vechile.service";

@Component({
  selector: 'app-updatevechile',
  templateUrl: './updatevechile.component.html',
  styleUrls: ['./updatevechile.component.css']
})
export class UpdatevechileComponent implements OnInit {

  typeProperty: Array<string> = Object.keys(Type).filter(key => isNaN(+key));
  fuelProperty: Array<string> = Object.keys(Fuel).filter(key => isNaN(+key));
  statusProperty: Array<string> = Object.keys(Status).filter(key => isNaN(+key));

  submitted = false;
  vechileForm!: FormGroup;
  vechileType!: FormControl;
  vechileFuel!: FormControl;
  vechileStatus!:FormControl;

  vechile!: Vechile;
  constructor(private activatedRoute: ActivatedRoute,
              public fb: FormBuilder,
              public vechileService: VechileService,
              public ngZone:NgZone,
              public router:Router
  ) { }

  ngOnInit(): void {
    this.vechile = this.activatedRoute.snapshot.data['preload'];

    this.vechileForm = this.fb.group({
      id: [this.vechile.id, [Validators.required]],
      platenumber: [this.vechile.platenumber, [Validators.required]],
      chassisnumber: [this.vechile.chassisnumber, [Validators.required]],
      date: [this.vechile.date, [Validators.required]],
      name: [this.vechile.name, [Validators.required]],
      brand: [this.vechile.brand, [Validators.required]],
      price: [this.vechile.price, [Validators.required]],
      kilometers: [this.vechile.kilometers, [Validators.required]],
      type: [this.vechile.type, [Validators.required]],
      status: [this.vechile.status, [Validators.required]],
      fuel: [this.vechile.fuel, [Validators.required]],
    });
    this.vechileType = this.vechileForm.controls['type'] as FormControl;
    this.vechileFuel = this.vechileForm.controls['fuel'] as FormControl;
    this.vechileStatus = this.vechileForm.controls['status'] as FormControl;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.vechileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.vechileForm.valid) {
      return false;
    } else {
      const vechile = this.vechileForm.value;
      return this.vechileService.updateVehcile(vechile).subscribe({
        complete: () => {
          console.log('Vechile successfully updated!'),
            this.ngZone.run(() => this.router.navigateByUrl('/vechiles'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }
}
