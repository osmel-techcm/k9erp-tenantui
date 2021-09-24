import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void {
    this._entity.id = 2
    this._entity.name = 'User Groups'
    this._entity.childRouter = 'usergroups'
  }

}
