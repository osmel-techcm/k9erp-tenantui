import { Component } from '@angular/core';
import { EventManager, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Globals } from './config/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'K9ERP';

  hideLoading: boolean = true;

  public constructor(private titleService: Title, private _router: Router, private _global: Globals, public _event: EventManager) {
      this.setTitle(this.title);
      this.listenerLocalStorage();   
  }

  ngOnInit(): void {
      
  }  

  public setTitle(newTitle: string) {
      this.titleService.setTitle(newTitle);
  }

  saving = {
      color: "primary",
      mode: "indeterminate",
      diameter: 50
  };

  public listenerLocalStorage(): void {
      window.addEventListener('storage', data => {
          if (data.key == this._global.keyStoreLogin && data.newValue) {
              this._router.navigate(["/mainview"]);
          }

          if (data.key == this._global.keyStoreLogin && !data.newValue) {
              this._router.navigate(["/login"])
          }
      }, false);
  }
}
