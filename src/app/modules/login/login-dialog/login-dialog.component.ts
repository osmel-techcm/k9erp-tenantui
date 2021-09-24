import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tenants } from 'src/app/models/tenants';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  tenantSel: Tenants = new Tenants();

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public tenants: Tenants[], private config: ConfigService, private _router: Router) { }

  ngOnInit(): void {
    //console.log(this.tenants)
    //res.data.tenants
  }

  closeDialog(){
    this.dialogRef.close(null)
  }

  saveDialog() {
    this.config.saveTokenStorage(this.tenantSel.tenantToken)
    this.config.saveTenantStorage(this.tenantSel.ConnectionString)
    this.dialogRef.close(null)
    this._router.navigate(["/mainview"]);
  }

}
