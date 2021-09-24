import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.scss']
})
export class PersonnelsComponent implements OnInit {

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void { 
    this._entity.id = 11
    this._entity.name = 'Personnels'
    this._entity.childRouter = 'personnels'
  }

}
