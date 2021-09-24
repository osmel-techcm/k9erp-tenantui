import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(private _router: Router, private config: ConfigService) { }

  ngOnInit() {
    if (this.config.serverIsAlive()) {
      this._router.navigate(['/dashboard'])
      return
    }
  }

}
