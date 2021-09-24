import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private _global: Globals) { }

  intercept(req, next) {
    //if (req.url.indexOf(':44351/') < 0) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem(this._global.keyStoreLogin) || '',
        'x-tenant-id': localStorage.getItem(this._global.keyTenantId) || ''
      });
      const cloneReq = req.clone({ headers });
      return next.handle(cloneReq)
    // } else {
    //   const headers = new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem(this._global.emailToken) || ''
    //   });
    //   const cloneReq = req.clone({ headers });
    //   return next.handle(cloneReq)
    // }    
  }
}
