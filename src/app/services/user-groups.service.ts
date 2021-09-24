import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { AspNetUsersGroups } from '../models/aspNetUsersGroups';
import { MenuItemDTO } from '../models/menuItemDTO';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class UserGroupsService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getUserGroups(paginatorData: PaginatorData){
    return this.http.get<responseData>(this._global.apiUrlMaster + "api/AspNetUsersGroups/GetGroupsByTenant?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  getUserGroup(id: number){
    return this.http.get<responseData>(this._global.apiUrlMaster + "api/AspNetUsersGroups/GetGroupByTenant?userGroup=" + id)
  }

  putUserGroup(userGroup: AspNetUsersGroups){
    return this.http.put<responseData>(this._global.apiUrlMaster + "api/AspNetUsersGroups/PutGroupByTenant", userGroup)
  }

  postUserGroup(userGroup: AspNetUsersGroups){
    return this.http.post<responseData>(this._global.apiUrlMaster + "api/AspNetUsersGroups/PostGroupByTenant", userGroup)
  }

  deleteUserGroup(id: number){
    return this.http.delete<responseData>(this._global.apiUrlMaster + "api/AspNetUsersGroups/DeleteGroupByTenant?userGroup=" + id)
  }

  GetPermissionByGroup(id: number, all: boolean){
    return this.http.get<responseData>(this._global.apiUrlMaster + "api/AspNetUsersGroups/GetPermissionByGroup?userGroup=" + id + "&all=" + all)
  }

  UpdatePermissionByGroup(menuItems: MenuItemDTO[]){
    return this.http.put<responseData>(this._global.apiUrlMaster + "api/AspNetUsersGroups/UpdatePermissionByGroup", menuItems)
  }
}
