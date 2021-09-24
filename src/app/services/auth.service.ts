import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private _global: Globals) { }

  loginUser(user) {
    return this.http.post<any>(this._global.apiUrlMaster + "api/Account/LoginTenant", user);
  }

  loggedIn() {
    return !!localStorage.getItem("authDataToken");
  }

  getUserProfile() {
    return this.http.get<any>(
      this._global.apiUrlMaster + "api/Account/getUserProfile"
    );
  }

  updateUserProfile(userProfile) {
    return this.http.post<any>(
      this._global.apiUrlMaster + "api/Account/updateUserProfile", userProfile
    );
  }
  
}
