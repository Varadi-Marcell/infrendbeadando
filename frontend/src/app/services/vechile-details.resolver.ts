import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Vechile} from "../models/Vechile";
import {VechileService} from "./vechile.service";

@Injectable({
  providedIn: 'root'
})
export class VechileDetailsResolver implements Resolve<Vechile> {

  constructor(private readonly vehicleService: VechileService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vechile> {
    console.log(route.params);
    return this.vehicleService.getVehicle(Number(route.params['id']));
  }
}
