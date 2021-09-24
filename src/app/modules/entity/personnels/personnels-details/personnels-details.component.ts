import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Globals } from 'src/app/config/globals';
import { Entity } from 'src/app/models/entity';
import { PersonnelsService } from 'src/app/services/personnels.service';

@Component({
  selector: 'app-personnels-details',
  templateUrl: './personnels-details.component.html',
  styleUrls: ['./personnels-details.component.scss']
})
export class PersonnelsDetailsComponent implements OnInit {

  _personnel = new Entity()
  _loadDetails = false
  _type = 11
  
  constructor(private _router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _personnelsService: PersonnelsService, 
    private _globals: Globals) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._personnel.id = +param.get('id')
        if (this._personnel.id != 0) {
          this.loadPersonnelDetails()
        } else {
          this._personnel = new Entity()
          this.initializeDate()
        }
      }
    )
  }

  loadPersonnelDetails(){
    this._personnelsService.getPersonnel(this._personnel.id).subscribe(
      data => {
        if (!data.error) {
          this._personnel = data.data
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
    this._personnel.startDate = this._globals.dateServer
    this._personnel.endDate = new Date()
    this._personnel.endDate.setDate(this._personnel.startDate.getDate() + 3652.5)
  }

  openPersonnel(id: number){
    this._router.navigate(['/mainview/personnels/' + id])
  }

  confirmDelete(){

  }

  savePersonnel(){
    if (this._personnel.id) {
      this._personnelsService.putPersonnel(this._personnel).subscribe(
        data => {
          this.openSnackBar(data.description, '', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._personnelsService.postPersonnel(this._personnel).subscribe(
        data => {
          if (!data.error) {
            this.openPersonnel(data.data.id)
          }
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  goToPersonnelList(){
    this._router.navigate(['/mainview/personnels'])
  }

  openSnackBar(message: string, action: string, type: number = 1) {    
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
