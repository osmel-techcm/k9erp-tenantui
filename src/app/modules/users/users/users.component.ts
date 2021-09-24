import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit { 

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void { 
    this._entity.id = 1
    this._entity.name = 'Users'
    this._entity.childRouter = 'users'
  }

}
