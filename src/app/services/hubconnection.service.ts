import { Injectable } from '@angular/core';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Globals } from '../config/globals';

@Injectable({
  providedIn: 'root'
})
export class HubconnectionService {

  constructor(private globals: Globals) { }

  connection = new HubConnectionBuilder()
  .withUrl(this.globals.apiUrlWebSocket + "mainhub", {
    accessTokenFactory: () => {
      return localStorage.getItem(this.globals.keyStoreLogin)
    },
    headers: {"x-tenant-id": localStorage.getItem(this.globals.keyTenantId)}
  })
  .configureLogging(LogLevel.Information)
  .build();
}
