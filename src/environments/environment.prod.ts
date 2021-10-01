export const environment = {
  production: true,
  apiUrlMaster: window["env"]["apiUrlMaster"] || "http://localhost:5010/",
  apiUrl: window["env"]["apiUrl"] || "http://localhost:5020/",
  apiUrlDriveManager: window["env"]["apiUrlDriveManager"] || "http://localhost:5030/",
  apiUrlReport: window["env"]["apiUrlReport"] || "http://localhost:5040/",
  apiUrlLog: window["env"]["apiUrlLog"] || "http://localhost:5050/",
  apiUrlWebSocket: window["env"]["apiUrlWebSocket"] || "http://localhost:5060/"
};
