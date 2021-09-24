import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AspNetUsersGroups } from 'src/app/models/aspNetUsersGroups';
import { MenuItemDTO } from 'src/app/models/menuItemDTO';
import { UserGroupsService } from 'src/app/services/user-groups.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-groups-details',
  templateUrl: './user-groups-details.component.html',
  styleUrls: ['./user-groups-details.component.scss']
})
export class UserGroupsDetailsComponent implements OnInit {

  _group = new AspNetUsersGroups()
  _loadDetails = false

  treeControl = new NestedTreeControl<MenuItemDTO>(node => node.subMenuItems);
  dataSource = new MatTreeNestedDataSource<MenuItemDTO>();

  checklistSelection = new SelectionModel<MenuItemDTO>(true /* multiple */);

  constructor(private _router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _userGroupsService: UserGroupsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._group.id = +param.get('id')
        if (this._group.id) {
          this.loadGroupDetails()
          this.loadGroupPermissions()
        } else {
          this._group = new AspNetUsersGroups()
          this._loadDetails = true
        }       
      }
    )
  }

  hasChild = (_: number, node: MenuItemDTO) => !!node.subMenuItems && node.subMenuItems.length > 0;

  loadGroupPermissions() {
    this._userGroupsService.GetPermissionByGroup(this._group.id, true).subscribe(
      data => {
        if (!data.error) {
          this.dataSource.data = data.data
        }
      }
    )
  }

  loadGroupDetails(){
    this._userGroupsService.getUserGroup(this._group.id).subscribe(
      data => {
        if (!data.error) {
          this._group = data.data
        } else {
          console.log(data.description)
        }
        this._loadDetails = true
      }
    )
  }

  openGroup(id: number){
    this._router.navigate(['/mainview/usergroups/' + id])
  }

  confirmDelete(){
    this._userGroupsService.deleteUserGroup(this._group.id).subscribe(
      data => {
        if (!data.error) {
          this.goToGroupList()
        }
        this.openSnackBar(data.description, '')
      },
      err => {
        console.log(err)
      }
    )
  }

  saveGroup(){
    if (this._group.id) {
      this._userGroupsService.putUserGroup(this._group).subscribe(
        data => {
          if (!data.error) {
            this._group = data.data
          }
          this.openSnackBar(data.description,'')
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._userGroupsService.postUserGroup(this._group).subscribe(
        data => {
          if (!data.error) {
            this.openGroup(data.data.id)
          }
          this.openSnackBar(data.description, '')
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  goToGroupList(){
    this._router.navigate(['/mainview/usergroups'])
  }

  openSnackBar(message: string, action: string) {    
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['green-snackbar']
    });
  }

  updateChildSelected(node: MenuItemDTO): void {
    if (node.subMenuItems.length > 0) {
      this.setValueChildNodes(node)
    }

    if (node.active && node.parentIdMenu) {
      this.updateParent(this.dataSource.data, node.parentIdMenu)
    }    
  }

  setValueChildNodes(node: MenuItemDTO){
    node.subMenuItems.forEach(element => {
      element.active = node.active
      if (element.subMenuItems.length > 0) {
        this.setValueChildNodes(element)
      }
    });
  }

  updateParent(data: MenuItemDTO[], parentIdMenu: string){
    let parent = data.find(x=> x.idMenu == parentIdMenu)    
    if (!parent) {
      data.forEach(element => {        
        this.updateParent(element.subMenuItems, parentIdMenu)
      });
      return   
    } else {      
      if (parent.parentIdMenu) {
        this.updateParent(this.dataSource.data, parent.parentIdMenu)
      } 
    }
    parent.active = true  
  }

  saveGroupPermissions(){
    this._userGroupsService.UpdatePermissionByGroup(this.dataSource.data).subscribe(
      data => {
        this.openSnackBar(data.description,'')
      }
    )
  }

}
