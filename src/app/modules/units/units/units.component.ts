import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void {
    this._entity.id = 7
    this._entity.name = 'Units'
    this._entity.childRouter = 'units'
    this._entity.orderField = 'name'
  }

}
