import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Class } from 'src/app/models/class';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.scss']
})
export class ClassesDetailsComponent implements OnInit {

  _class = new Class()

  constructor(private _router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _classesService: ClassesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._class.id = +param.get('id')
        if (this._class.id != 0) {
          this.loadClassDetails()
        } else {
          this._class = new Class()
        }
      }
    )
  }

  loadClassDetails(){
    this._classesService.getClass(this._class.id).subscribe(
      data => {
        if (!data.error) {
          this._class = data.data
        } else {
          console.log(data.description)
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  openClass(id){
    this._router.navigate(['/mainview/classes/' + id])
  }

  deleteClass(){

  }

  saveClass(){
    if (!this._class.id) {
      this._classesService.postClass(this._class).subscribe(
        data => {
          if (!data.error) {
            this.openClass(data.data.id)
          }
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._classesService.putClass(this._class).subscribe(
        data => {
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  goToClassList(){
    this._router.navigate(['/mainview/classes'])
  }

  openSnackBar(message: string, action: string, type: number = 1) {    
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
