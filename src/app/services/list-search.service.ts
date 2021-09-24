import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { PaginatorData } from '../models/PaginatorData';
import { ClassesService } from './classes.service';
import { CustomersService } from './customers.service';
import { ItemsService } from './items.service';
import { PersonnelsService } from './personnels.service';
import { UnitsService } from './units.service';
import { UserGroupsService } from './user-groups.service';
import { UsersService } from './users.service';
import { VendorsService } from './vendors.service';

@Injectable({
  providedIn: 'root'
})
export class ListSearchService {

  constructor(private http: HttpClient, private _global: Globals, 
    private _usersService: UsersService, private _userGroupsService: UserGroupsService, 
    private _classesService: ClassesService, private _unitsService: UnitsService, private _itemsService: ItemsService, private _vendorsService: VendorsService,
    private _customersService: CustomersService, private _personnelsService: PersonnelsService ) { }

  getData(type: number, paginatorData: PaginatorData){
    switch (type) {
      case 1:
        return this._usersService.getUsers(paginatorData)
      case 2:
        return this._userGroupsService.getUserGroups(paginatorData)
      case 6:
        return this._classesService.getClasses(paginatorData)
      case 7:
        return this._unitsService.getUnits(paginatorData)
      case 8:
        return this._itemsService.getItems(paginatorData)
      case 9:
        return this._vendorsService.getVendors(paginatorData)
      case 10:
        return this._customersService.getCustomers(paginatorData)
      case 11:
        return this._personnelsService.getPersonnels(paginatorData)
    }
  }

}
