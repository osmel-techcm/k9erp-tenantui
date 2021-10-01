// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlMaster: window["env"]["apiUrlMaster"] || "http://localhost:5010/",
  apiUrl: window["env"]["apiUrl"] || "http://localhost:5020/",
  apiUrlDriveManager: window["env"]["apiUrlDriveManager"] || "http://localhost:5030/",
  apiUrlReport: window["env"]["apiUrlReport"] || "http://localhost:5040/",
  apiUrlLog: window["env"]["apiUrlLog"] || "http://localhost:5050/",
  apiUrlWebSocket: window["env"]["apiUrlWebSocket"] || "http://localhost:3000/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
