import { Injectable } from '@angular/core';
import {catchError, lastValueFrom, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Vechile} from "../models/Vechile";

@Injectable({
  providedIn: 'root'
})
export class VechileService {

  constructor(private http:HttpClient) { }

  getAll(){
    return lastValueFrom(this.http.get<Vechile[]>(`/api/vechiles/listvechiles`));
  }

  getVehicle(id:any): Observable<Vechile> {
    return this.http.post<Vechile>(`/api/vechiles/getvechile/`, {id});
  }

  createVechile(vechile: Vechile): Observable<any> {
    return this.http.post('http://localhost:3000/api/vechiles/createvechile', vechile);
  }

  deleteVehcile(id:any) {
    return lastValueFrom(this.http.delete('http://localhost:3000/api/vechiles/deletevechile/'+id));
  }

  updateVehcile(vechile: Vechile){
    return this.http.patch('http://localhost:3000/api/vechiles/update-vechile', vechile);
  }

}
