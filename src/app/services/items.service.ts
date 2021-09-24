import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { Item } from '../models/item';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getItems(paginatorData: PaginatorData){
    return this.http.get<responseData>(this._global.apiUrl + "api/Items?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  postItem(item: Item) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Items", item)
  }

  getItem(id: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Items/" + id)
  }

  putItem(item: Item) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Items/" + item.id, item)
  }
}
