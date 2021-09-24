import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void {
    this._entity.id = 6
    this._entity.name = 'Classes'
    this._entity.childRouter = 'classes'
    this._entity.orderField = 'name'
  }

}
