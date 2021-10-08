import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-details-two-factor',
  templateUrl: './users-details-two-factor.component.html',
  styleUrls: ['./users-details-two-factor.component.scss']
})
export class UsersDetailsTwoFactorComponent implements OnInit {

  imageSource;
  code;
  message;

  constructor(public dialogRef: MatDialogRef<UsersDetailsTwoFactorComponent>, @Inject(MAT_DIALOG_DATA) public userId: string, private _usersService: UsersService, 
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getTwoFactorAuth()
  }
  
  getTwoFactorAuth() {
    this._usersService.getTwoFactorAuth(this.userId).subscribe(
      data => {
        if (!data.error) {
          this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data.data.qrCodeSetupImageUrl)               
        }
      }
    )
  }

  closeDialog(enabled: boolean){
    this.dialogRef.close(enabled)
  }

  saveDialog() {

    this.message = null

    if (!this.code) {
      this.message = 'Please enter a code!';
      return;
    }

    this._usersService.enableTwoFactorAuth(this.userId, this.code).subscribe(
      data => {
        if (data.error) {
          this.message = data.description;
          return;
        }
        this.closeDialog(true)
      } 
    )

  }

}
