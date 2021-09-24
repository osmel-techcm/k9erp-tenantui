import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void {
    this._entity.id = 8
    this._entity.name = 'Items'
    this._entity.childRouter = 'items'
    this._entity.orderField = 'name'
  }

}
