import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import { catchError, lastValueFrom, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('/api/user/listAll');
  }

  getUsersByVechiles(): Observable<User[]>{
    return this.http.get<User[]>('/api/user/get');
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/user/create', user);
  }

  getUserById(id:any): Observable<User> {
    return this.http.post<User>(`/api/user/get-user/`, {id});
  }

  addVechilesToUser(id:any,vechileId:any): Observable<User> {
    return this.http.post<User>(`/api/user/add-vechile/`, {"userId": id,"vechileId": vechileId});
  }

  updateUser(user: User){
    return this.http.patch('/api/user/update-user', user);
  }

  endOfRent(userid:any,vechileid:any,kilometer:any){
    return this.http.delete('/api/user/delete-vechile',{body:{"userId":userid, "vechileId": vechileid,"kilometer":kilometer}});
  }

  async addUser(user: User) {
    return await lastValueFrom(this.http.post<User>('/api/user/create' , user));
  }

  deleteUserById(id:any) {
    return lastValueFrom(this.http.delete('/api/user/delete/'+id));

  }

}
