import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Globals } from 'src/app/config/globals';
import { ConfigDTO } from 'src/app/models/configDTO';
import { MenuItemDTO } from 'src/app/models/menuItemDTO';
import { UserConnected } from 'src/app/models/userConnected';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { HubconnectionService } from 'src/app/services/hubconnection.service';
import { UserGroupsService } from 'src/app/services/user-groups.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @ViewChild('idleSwal') private idleSwal: SwalComponent;
  @ViewChild('snav') sidenav: MatSidenav;

  appTitle: string

  navItems: MenuItemDTO[]

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  private idle = 10;
  private idleTimeOut = 10;
  private idleCounter = 0;
  idleTimeOutCounter = 0;
  private idleModalIsOpen = false;

  tenants:any
  tenant:string

  name: string

  _config = new ConfigDTO()
  userConnected = new UserConnected()

  constructor ( private _router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private config: ConfigService, 
    private globals: Globals, private _authService: AuthService, private title: Title, private _userGroupsService: UserGroupsService, private _hubConnection: HubconnectionService) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    this.mobileQuery.addEventListener('change', (e) => {
      console.log(e)
    })

    this._router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.updateHubServerUrl(val.urlAfterRedirects);
      }
    });

    this._hubConnection.connection.on("ReceiveMessage", (user, message) => {
      console.log('SignalR:', user, message)
    }); 
   }

  updateHubServerUrl(urlAfterRedirects: string) {    
    if (this._hubConnection.connection.state != 'Connected') {
      setTimeout(() => this.updateHubServerUrl(urlAfterRedirects), 1000)
      return
    }
    this._hubConnection.connection.invoke("updateUrlUser", urlAfterRedirects).catch(err => console.error(err));
  }

  ngOnInit(): void {   
    
    this.appTitle = this.title.getTitle()

    this.loadMenuItems()

    this.config.getDateTimeServer().subscribe(
      data => { this.globals.dateServer = new Date(data) },
      err => { }
    )

    this.getConfig()
    
    this.config.startTokenTimer()
    this.startHub()

    this.getTenants()

    this.tenant = this.config.getTenant()

    this.name = JSON.parse(localStorage.getItem('authData'))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] + ' ' + JSON.parse(localStorage.getItem('authData'))['LastName']

    this._config = this.config._config

    this._hubConnection.connection.onclose(async (data) => {      
      if (this._authService.loggedIn()) {
        setTimeout(() => this.startHub(), 5000);
      }      
    })
  }

  getTenants() {
    this.tenants = this.config.getTenants().tenants
  }

  // connection = new HubConnectionBuilder()
  //   .withUrl(this.globals.apiUrlWebSocket + "mainhub", {
  //     accessTokenFactory: () => {
  //       return localStorage.getItem(this.globals.keyStoreLogin)
  //     },
  //     headers: {"x-tenant-id": localStorage.getItem(this.globals.keyTenantId)}
  //   })
  //   .configureLogging(LogLevel.Information)
  //   .build();

  startHub(){
    try {
        this._hubConnection.connection.start()
          .then(()=>{
              this.connectUser();
          })
          .catch((err) => {
            setTimeout(() => this.startHub(), 5000);
          })

    } catch (err) {
        setTimeout(() => this.startHub(), 5000);
    }
  }

  connectUser(){
    this.userConnected.appId = this.config.getAppId()
    this.userConnected.companyId = this.config.getTenant()
    this.userConnected.deviceType = 1
    this._hubConnection.connection.invoke("connectUser", this.userConnected).catch(err => console.error(err));
  }

  getConfig() {
    this.config.loadConfigData()    
  }

  toggleSnav(nav) {    
    if (!nav.children) {
      this.sidenav.toggle()
    }
    //console.log(nav)
  }

  changeCompany(ten){    
    if (ten.ConnectionString == this.tenant) {
      return
    }
    this.config.saveTokenStorage(ten.tenantToken)
    this.config.saveTenantStorage(ten.ConnectionString)
    this.tenant = ten.ConnectionString
    this._router.navigate(["/mainview"])
  }

  loadMenuItems(){
    this._userGroupsService.GetPermissionByGroup(JSON.parse(localStorage.getItem('authData')).IdGroup, false).subscribe(
      data=> {
        this.navItems = data.data
        this.navItems.push({
          id: 0,
          active: true,
          displayName: 'Logout',
          function: 'logoutUser',
          iconName: 'logout',
          idMenu: '',
          idMenuItemUserGroup: 0,
          parentIdMenu: '',
          route: '',
          subMenuItems: null
        })
      }
    )
  }

}

