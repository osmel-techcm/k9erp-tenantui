import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class Globals {
  readonly apiUrlMaster: string = environment.apiUrlMaster;
  readonly apiUrl: string = environment.apiUrl;
  readonly apiUrlWebSocket: string = environment.apiUrlWebSocket;
  readonly apiUrlDriveManager: string = environment.apiUrlDriveManager;
  readonly apiUrlReport: string = environment.apiUrlReport;
  readonly keyStoreLogin = "authDataToken";
  readonly keyStoreAuth = "authData";
  readonly keyTenantId = "tenantId";
  readonly keyTenants = "tenants";
  readonly emailToken = "emailToken";
  dateServer: Date;
}