import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/config/globals';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData = {
    email: null,
    password: null
  };

  currentYear = new Date().getFullYear();

  message = {
    title: null,
    text: null
  };

  loading = {
    color: "#FFF",
    mode: "indeterminate",
    diameter: 15
  };

  tenantId: string;

  ajaxRequest: boolean = false;

  constructor(private _auth: AuthService, private _router: Router, public dialogTenant: MatDialog, public _globals: Globals, private config: ConfigService) { }

  ngOnInit() {    
    
    if (!this.config.serverIsAlive()) {
      this._router.navigate(['/notfound'])
      return
    }

    if (this._auth.loggedIn()) {
      this._router.navigate(["/mainview"])
      return
    }
    
  }

  openDialog(infoTitle, infoText) {
    this.message.title = infoTitle ? infoTitle : "Information";
    this.message.text = infoText;

    Swal.fire({
      title: this.message.title,
      text: this.message.text,
      confirmButtonText: "OK",
      heightAuto: false
    });
  }

  loginUser() {
    if (!this.userData.email) {
      this.openDialog(null, "Please insert a email!");
      return;
    }

    if (!this.userData.password) {
      this.openDialog(null, "Please insert a password!");
      return;
    }

    this.ajaxRequest = true;

    this._auth.loginUser(this.userData).subscribe(
      res => {
        if (!res.error) {          
          this.config.saveTenants(res.data)          
          if (res.data.multiTenant){
            const dialogRef = this.dialogTenant.open(LoginDialogComponent, {              
              data: res.data.tenants,
              disableClose: true
            });
          } else{
            this.config.saveTokenStorage(res.data.tenants[0].tenantToken)
            this.config.saveTenantStorage(res.data.tenants[0].ConnectionString)
            this._router.navigate(["/mainview"]);
          }
        } else {
          this.openDialog(null, res.description);
        }
      },
      err => (this.ajaxRequest = false),
      () => (this.ajaxRequest = false)
    );
  }

}
