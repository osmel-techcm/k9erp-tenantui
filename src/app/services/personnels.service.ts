import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { Entity } from '../models/entity';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class PersonnelsService {

  
  constructor(private http: HttpClient, private _global: Globals) { }

  getPersonnels(paginatorData: PaginatorData){
    return this.http.get<responseData>(this._global.apiUrl + "api/Personnels?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  postPersonnel(personnels: Entity) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Personnels", personnels)
  }

  getPersonnel(id: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Personnels/" + id)
  }

  putPersonnel(personnels: Entity) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Personnels/" + personnels.id, personnels)
  }
}
