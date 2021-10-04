import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { responseData } from '../models/responseData';
import { ConfigDTO } from '../models/configDTO';
import { v4 as uuidv4 } from 'uuid';
import { HubconnectionService } from './hubconnection.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _serverStatusAlive = false;
  private _serverMasterStatusAlive = false;
  public _config = new ConfigDTO()

  constructor(private http: HttpClient, private _global: Globals, private _router: Router, private _hubConnection: HubconnectionService) { }

  checkMasterServerStatus() {
    return this.http.get<any>(this._global.apiUrlMaster + "api/Account/serverStatusAlive")
      .toPromise()
      .then(
        () => {
          this._serverMasterStatusAlive = true
        },
        () => {
          this._serverMasterStatusAlive = false
        }
      )
  }

  checkServerStatus() {
    return this.http.get<any>(this._global.apiUrl + "api/Account/serverStatusAlive")
      .toPromise()
      .then(
        () => {
          this._serverStatusAlive = true
        },
        () => {
          this._serverStatusAlive = false
        }
      )
  }

  serverIsAlive() {
    return this._serverStatusAlive && this._serverMasterStatusAlive
  }

  saveTokenStorage(token) {
    localStorage.setItem(this._global.keyStoreLogin, token);
    localStorage.setItem(this._global.keyStoreAuth, JSON.stringify(jwt_decode(token)));
  }

  saveTenantStorage(tenant) {
    localStorage.setItem(this._global.keyTenantId, tenant)
  }

  saveTenants(tenants){
    localStorage.setItem(this._global.keyTenants, JSON.stringify(tenants))
  }

  getTenants(){
    return JSON.parse(localStorage.getItem(this._global.keyTenants))
  }

  getTenant(){
    return localStorage.getItem(this._global.keyTenantId)
  }

  getDateTimeServer() {
    return this.http.get<any>(this._global.apiUrlMaster + "api/Account/getDateTimeServer")
  }

  startTokenTimer() {    
    const authMasterData = JSON.parse(localStorage.getItem(this._global.keyStoreAuth))    
    const expDate = new Date(authMasterData.exp * 1000)

    if (!this._global.dateServer) {
      setTimeout(() => {
        this.startTokenTimer()
      }, 100)      
      return
    }

    const diffDate = (expDate.getTime() - this._global.dateServer.getTime()) / (1000 * 60 * 60 * 24)

    if (diffDate < 7) {
      this.refreshToken().subscribe(
        data => {
          if (!data.error) {
            this.saveTokenStorage(data.data)
            this.startTokenTimer()
          } else {
            this.logoutUser()
          }
        },
        err => { console.log(err) }
      )
    } else {
      setTimeout(() => {
        this.startTokenTimer()
      }, 86400000)
      return
    }
  }

  refreshToken() {
    return this.http.get<any>(this._global.apiUrlMaster + "api/Account/RefreshToken")
  }

  loadConfigData() {
    this.http.get<responseData>(this._global.apiUrl + "api/config").subscribe(
      data => {
        if (!data.error) {
          if(data.data){
            data.data.forEach(element => {
              this._config[element.propName] = element.propValue
            })  
          }        
        } else {
          console.log(data.description)
        }
      }
    )
  }

  logoutUser() {
    localStorage.removeItem(this._global.keyStoreLogin)
    localStorage.removeItem(this._global.keyStoreAuth)
    localStorage.removeItem(this._global.keyTenantId)
    localStorage.removeItem(this._global.keyTenants)
    this._hubConnection.connection.stop()
    this._router.navigate(["/login"])
  }

  saveConfigData(config: ConfigDTO){
    return this.http.post<responseData>(this._global.apiUrl + "api/Config/updateConfig", config)
  }

  getTimeZones(){
    return this.http.get<responseData>(this._global.apiUrl + "api/Config/getTimeZones")
  }

  saveEmailToken(token){
    localStorage.setItem(this._global.emailToken, token);
  }

  getAppId(){
    var appId = localStorage.getItem(this._global.appId)
    if (!appId) {
      appId = uuidv4()
      localStorage.setItem(this._global.appId, appId);
    }
    return appId
  }


}
