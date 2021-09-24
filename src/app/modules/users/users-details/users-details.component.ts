import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AspNetUsers } from 'src/app/models/aspNetUsers';
import { AspNetUsersGroups } from 'src/app/models/aspNetUsersGroups';
import { PaginatorData } from 'src/app/models/PaginatorData';
import { UserGroupsService } from 'src/app/services/user-groups.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  _user = new AspNetUsers();
  _userGroups: [AspNetUsersGroups];
  _loadDetails = false
  paginatorData = new PaginatorData()

  constructor(private _router: Router, private route: ActivatedRoute, private _usersService: UsersService, 
    private _userGroupsService: UserGroupsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.paginatorData.PageSize = 25
    this.paginatorData.filterDataSt = ""
    this.paginatorData.orderField = "name"
    this.paginatorData.descending = false

    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._user.id = param.get('id')
        if (this._user.id != '0') {
          this.loadUserDetails()
        } else {
          this._user = new AspNetUsers()
          this._user.inactive = false
          this._user.masterDealer = false
          this._loadDetails = true
        }
        this.loadUserGroups()
      }
    )

  }

  loadUserDetails() {
    this._usersService.getUser(this._user.id).subscribe(
      data => {
        if (!data.error) {
          this._user = data.data
        } else {
          console.log(data.description)
        }
        this._loadDetails = true
      }
    )
  }
  
  loadUserGroups() {
    this._userGroupsService.getUserGroups(this.paginatorData).subscribe(
      data => {
        if (!data.error) {
          this._userGroups = data.data.rows
        } else {
          console.log(data.description)
        }
      },
      err => {

      }
    )
  }

  openUser(id: number){
    this._router.navigate(['/mainview/users/' + id])
  }

  confirmDelete(){

  }

  saveUser(){
    if (this._user.id) {
      this._usersService.putUser(this._user).subscribe(
        data => {
          this.openSnackBar(data.description, '')
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._usersService.postUser(this._user).subscribe(
        data => {
          if (!data.error) {
            this.openUser(data.data.userId)
          } else {
            if (data.othersValidations) {
              let messageError = ''
              let errors = data.othersValidations.errors
              for (let i = 0; i < errors.length; i++) {
                messageError += errors[i].description + '\n'
              }
              this.openSnackBar(messageError, '')
            } else {
              this.openSnackBar(data.description, '')
            }
          }          
        },
        err => {

        }
      )
    }
  }

  goToUserList(){
    this._router.navigate(['/mainview/users/'])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['green-snackbar']
    });
  }

}
