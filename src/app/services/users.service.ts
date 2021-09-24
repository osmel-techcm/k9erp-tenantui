import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { AspNetUsers } from '../models/aspNetUsers';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getUsers(paginatorData: PaginatorData){
    return this.http.get<any>(this._global.apiUrlMaster + "api/AspNetUsers/GetUsersByTenant?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }
  
  getUser(userId: string){
    return this.http.get<any>(this._global.apiUrlMaster + "api/AspNetUsers/GetUserByTenant?userId=" + userId)
  }

  putUser(user: AspNetUsers){
    return this.http.put<responseData>(this._global.apiUrlMaster + "api/AspNetUsers/PutUserByTenant", user)
  }

  postUser(user: AspNetUsers){
    return this.http.post<responseData>(this._global.apiUrlMaster + "api/AspNetUsers/PostUserByTenant", user)
  }
}
