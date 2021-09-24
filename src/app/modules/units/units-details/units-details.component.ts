import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Unit } from 'src/app/models/unit';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-units-details',
  templateUrl: './units-details.component.html',
  styleUrls: ['./units-details.component.scss']
})
export class UnitsDetailsComponent implements OnInit {

  unit = new Unit()

  constructor(private _router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _unitsService: UnitsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this.unit.id = +param.get('id')
        if (this.unit.id != 0) {
          this.loadUnitDetails()
        } else {
          this.unit = new Unit()
        }
      }
    )
  }

  loadUnitDetails(){
    this._unitsService.getUnit(this.unit.id).subscribe(
      data => {
        if (!data.error) {
          this.unit = data.data
        } else {
          console.log(data.description)
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  openUnit(id){
    this._router.navigate(['/mainview/units/' + id])
  }

  deleteUnit(){

  }

  saveUnit(){
    if (!this.unit.id) {
      this._unitsService.postUnit(this.unit).subscribe(
        data => {
          if (!data.error) {
            this.openUnit(data.data.id)
          }
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._unitsService.putUnit(this.unit).subscribe(
        data => {
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  goToUnitList(){
    this._router.navigate(['/mainview/units'])
  }

  openSnackBar(message: string, action: string, type: number = 1) {    
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
