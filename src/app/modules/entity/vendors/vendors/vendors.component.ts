import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void { 
    this._entity.id = 9
    this._entity.name = 'Vendors'
    this._entity.childRouter = 'vendors'
  }

}
