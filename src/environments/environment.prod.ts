export const environment = {
  production: true,
  apiUrlMaster: window["env"]["apiUrlMaster"] || "http://localhost:5000/",
  apiUrl: window["env"]["apiUrl"] || "http://localhost:5002/",
  apiUrlWebSocket: window["env"]["apiUrlWebSocket"] || "http://localhost:3000/",
  apiUrlDriveManager: window["env"]["apiUrlDriveManager"] || "http://localhost:5004/",
  apiUrlReport: window["env"]["apiUrlReport"] || "http://localhost:5005/"
};
