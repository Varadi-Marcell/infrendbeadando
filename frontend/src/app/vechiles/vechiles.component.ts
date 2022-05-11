import {Component, NgZone, OnInit} from '@angular/core';
import {Vechile} from "../models/Vechile";
import {VechileService} from "../services/vechile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vechiles',
  templateUrl: './vechiles.component.html',
  styleUrls: ['./vechiles.component.css']
})
export class VechilesComponent implements OnInit {

  list: Array<string>=[];
  plateNumberList: Array<string>=[];
  selected=-1;
  vechiles!: Vechile[];
  filterTerm!: any;
  filterTerm2!: any;

  form!:FormGroup;
  platenumber!: FormControl;
  brand!: FormControl;

  constructor(private vechileService: VechileService,
              public fb: FormBuilder,
              public ngZone:NgZone,
              public router:Router,
  ) {

  }

  async ngOnInit(){

    try{
      this.vechiles = await this.vechileService.getAll();

    }catch(err){
      console.log(err);
    }
    this.disnict();
    this.fill();
    console.log(this.list);


    this.form = this.fb.group({
      platenumber: ['', [Validators.required]],
      brand: ['', [Validators.required]],

    });
    this.platenumber = this.form.controls['platenumber'] as FormControl;
    this.brand = this.form.controls['brand'] as FormControl;


  }

  disnict(){
    for (let i = 0; i < this.vechiles.length; i++) {
      const temp = this.vechiles[i].brand;
      if(!this.list.includes(temp)){
        this.list.push(temp);
      }
    }
  }

  fill(){
    for (let i = 0; i < this.vechiles.length; i++) {
        this.plateNumberList.push(this.vechiles[i].platenumber);
    }
  }
  delete(id:any){
    console.log("ASD");
    this.vechileService.deleteVehcile(id);
    window.location.reload();
  }

  search(){
    const temp  = this.form.value.platenumber;
   // console.log(temp);
    for (let i = 0; i < this.vechiles.length; i++) {
      if(temp === this.vechiles[i].platenumber){
     //     console.log(this.vechiles[i].id);
        this.router.navigate(['/vechile/'+this.vechiles[i].id]);

      }
    }
  }

  filterBrands() {
    console.log(this.selected);
    for (let i = 0; i < this.list.length; i++) {
     if(this.selected === i){
       console.log(this.list[i]);
       this.filterTerm=this.list[i];
     }
    }
  }
}
