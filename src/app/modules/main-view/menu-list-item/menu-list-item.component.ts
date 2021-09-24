import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MenuItemDTO } from 'src/app/models/menuItemDTO';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
    trigger('inOutAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('125ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('125ms ease-in', style({ opacity: 0 }))])
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: MenuItemDTO;
  @Input() depth: number;
  @Input() snavMat: MatSidenav;

  constructor(public router: Router, private _config: ConfigService) { }

  ngOnInit(): void {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: MenuItemDTO) {    
    if (!item.subMenuItems || !item.subMenuItems.length) {
      this.snavMat.toggle()
      if (item.function) {
        switch (item.function) {
          case "logoutUser":
            this._config.logoutUser()
            break;
        }
        return
      }
      this.router.navigate([item.route])
    }
    if (item.subMenuItems && item.subMenuItems.length) {
      this.expanded = !this.expanded      
    }    
  }

}
