import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Globals } from 'src/app/config/globals';
import { Entity } from 'src/app/models/entity';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.scss']
})
export class CustomersDetailsComponent implements OnInit {

  _customer = new Entity()
  _loadDetails = false
  _type = 10

  constructor(private _router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _customersService: CustomersService, 
    private _globals: Globals) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._customer.id = +param.get('id')
        if (this._customer.id != 0) {
          this.loadCustomerDetails()
        } else {
          this._customer = new Entity()
          this.initializeDate()
        }
      }
    )
  }

  loadCustomerDetails() {
      this._customersService.getCustomer(this._customer.id).subscribe(
      data => {
        if (!data.error) {
          this._customer = data.data
        } else {
          console.log(data.description)
        }
        this._loadDetails = true
      }
    )
  }

  initializeDate() {
    if (!this._globals.dateServer) {      
      setTimeout(() => {
        this.initializeDate()        
      }, 200);
      return
    }
    this._customer.startDate = this._globals.dateServer
    this._customer.endDate = new Date()
    this._customer.endDate.setDate(this._customer.startDate.getDate() + 3652.5)
  }

  openCustomer(id: number){
    this._router.navigate(['/mainview/customers/' + id])
  }

  confirmDelete(){

  }

  saveCustomer(){
    if (this._customer.id) {
      this._customersService.putCustomer(this._customer).subscribe(
        data => {
          this.openSnackBar(data.description, '', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._customersService.postCustomer(this._customer).subscribe(
        data => {
          if (!data.error) {
            this.openCustomer(data.data.id)
          }
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  goToCustomerList(){
    this._router.navigate(['/mainview/customers'])
  }

  openSnackBar(message: string, action: string, type: number = 1) {    
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
