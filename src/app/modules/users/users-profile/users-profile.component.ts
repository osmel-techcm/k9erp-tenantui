import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AspNetUsers } from 'src/app/models/aspNetUsers';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { UsersDetailsTwoFactorComponent } from '../users-details-two-factor/users-details-two-factor.component';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  _user = new AspNetUsers();
  _loadDetails = false

  constructor(private _usersService: UsersService, private _snackBar: MatSnackBar, public dialog: MatDialog, 
    public _authService: AuthService, public dialogRef: MatDialogRef<UsersDetailsTwoFactorComponent>) { }

  ngOnInit(): void {
    this.loadUserDetails()
  }

  loadUserDetails() {
    this._authService.getUserProfile().subscribe(
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

  saveUser(){
    this._usersService.putUser(this._user).subscribe(
      data => {
        this.openSnackBar(data.description, '')
      },
      err => {
        console.log(err)
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['green-snackbar']
    });
  }

  openTwoFactorDialog(){
    let dialogRef = this.dialog.open(UsersDetailsTwoFactorComponent, {
      data: this._user.id,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUserDetails()
      }
    });
  }

  disableTwoFactorAuth(){
    this._user.twoFactorEnabled = false
    this.saveUser()
  }

}
