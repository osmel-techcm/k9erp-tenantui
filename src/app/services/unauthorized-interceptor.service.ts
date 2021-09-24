import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../config/globals';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptorService {

  constructor(private _router: Router, private _global: Globals, private _configService: ConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

      return next.handle(req).pipe(
          tap(
              event => { },
              error => {
                if (error.status === 401) {
                  console.log(req)
                  this._configService.logoutUser()
                }
              }
          )
      );
  }
  
}
