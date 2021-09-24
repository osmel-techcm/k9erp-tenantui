import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Class } from 'src/app/models/class';
import { Item } from 'src/app/models/item';
import { PaginatorData } from 'src/app/models/PaginatorData';
import { Unit } from 'src/app/models/unit';
import { ClassesService } from 'src/app/services/classes.service';
import { ItemsService } from 'src/app/services/items.service';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.scss']
})
export class ItemsDetailsComponent implements OnInit {

  item = new Item()
  _classes: Class[]
  _units: Unit[]
  _loadDetails = false
  _type = 8
  _locations: Location[]

  paginatorData = new PaginatorData()

  constructor(private _router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _itemsService: ItemsService, 
    private _classesService: ClassesService, private _unitsService: UnitsService, 
    public dialogBarcode: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this.item.id = +param.get('id')
        if (this.item.id != 0) {
          this.loadItemDetails()          
        } else {
          this.item = new Item()
        }
        this.loadDependencies()
      }
    )
  }

  loadItemDetails(){
    this._itemsService.getItem(this.item.id).subscribe(
      data => {
        if (!data.error) {
          this.item = data.data
        } else {
          console.log(data.description)
        }
        this._loadDetails = true
      }
    )
  }

  loadDependencies(){
    this.loadClasses()
    this.loadUnits()
  }

  loadClasses(){
    this.item.className = this.item.className ?? ''
    this.paginatorData.PageSize = 25
    this.paginatorData.filterDataSt = "{'name':'" + this.item.className + "'}"
    this.paginatorData.orderField = 'name'
    this.paginatorData.descending = false
    this._classesService.getClasses(this.paginatorData).subscribe(
      data => {
        if (!data.error) {
          this._classes = data.data.rows
          if (this.item.idClass) {
            var exist = this._classes.find(e => e.id == this.item.idClass)
            if (!exist) {
              this._classes.push({
                id: this.item.idClass,
                name: this.item.className
              })
            }
          }
        }        
      }
    )
  }

  loadUnits(){
    this.item.unitName = this.item.unitName ?? ''
    this.paginatorData.PageSize = 25
    this.paginatorData.filterDataSt = "{'name':'" + this.item.unitName + "'}"
    this.paginatorData.orderField = 'name'
    this.paginatorData.descending = false
    this._unitsService.getUnits(this.paginatorData).subscribe(
      data => {
        if (!data.error) {
          this._units = data.data.rows
          if (this.item.idUnit) {
            var exist = this._units.find(e => e.id == this.item.idUnit)
            if (!exist) {
              this._units.push({
                id: this.item.idUnit,
                name: this.item.unitName
              })
            }
          }
        }
      }
    )
  }

  openItem(id: number){
    this._router.navigate(['/mainview/items/' + id])
  }

  deleteItem(){

  }

  saveItem(){
    if (this.item.id) {
      this._itemsService.putItem(this.item).subscribe(
        data => {
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._itemsService.postItem(this.item).subscribe(
        data => {
          if (!data.error) {
            this.openItem(data.data.id)
          }
          this.openSnackBar(data.description,'', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  goToItemList(){
    this._router.navigate(['/mainview/items'])
  }

  checkBlur(property: string, data: Array<any>, field: string, fieldUpd: string){
    if (!this.item[property]) {
      this.item[property] = null
      this.item[fieldUpd] = null
      return
    }
    var itemExist = data.find( e => e[field].toLowerCase() == this.item[property].toLowerCase())
    if (itemExist) {
      this.item[property] = itemExist[field]
      this.item[fieldUpd] = itemExist.id      
    } else {
      this.item[property] = null
      this.item[fieldUpd] = null
    }
  }

  updateSource(property: string){
    switch (property) {
      case "className":
        this.loadClasses()  
        break;
      case "unitName":
        this.loadUnits()  
        break;
    }   
  }

  openSnackBar(message: string, action: string, type: number = 1) {    
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}