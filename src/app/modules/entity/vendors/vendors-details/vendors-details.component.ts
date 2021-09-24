import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Entity } from 'src/app/models/entity';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-vendors-details',
  templateUrl: './vendors-details.component.html',
  styleUrls: ['./vendors-details.component.scss']
})
export class VendorsDetailsComponent implements OnInit {

  _vendor = new Entity()
  _loadDetails = false
  _type = 9

  constructor(private _router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _vendorsService: VendorsService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._vendor.id = +param.get('id')
        if (this._vendor.id != 0) {
          this.loadVendorDetails()
        } else {
          this._vendor = new Entity()
        }
      }
    )

  }

  loadVendorDetails(){
    this._vendorsService.getVendor(this._vendor.id).subscribe(
      data => {
        if (!data.error) {
          this._vendor = data.data
        } else {
          console.log(data.description)
        }
        this._loadDetails = true
      }
    )
  }

  openVendor(id: number){
    this._router.navigate(['/mainview/vendors/' + id])
  }

  confirmDelete(){

  }

  saveVendor(){
    if (this._vendor.id) {
      this._vendorsService.putVendor(this._vendor).subscribe(
        data => {
          this.openSnackBar(data.description, '', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._vendorsService.postVendor(this._vendor).subscribe(
        data => {
          if (!data.error) {
            this.openVendor(data.data.id)
          }
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  goToVendorList(){
    this._router.navigate(['/mainview/vendors'])
  }

  openSnackBar(message: string, action: string, type: number = 1) {    
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
