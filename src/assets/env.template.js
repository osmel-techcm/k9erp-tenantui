(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["apiUrlMaster"] = "${API_URL_MASTER}";
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["apiUrlWebSocket"] = "${API_URL_SIGNALR}";
    window["env"]["apiUrlDriveManager"] = "${API_URL_DRIVEMANAGER}";
    window["env"]["apiUrlReport"] = "${API_URL_REPORT}";
    window["env"]["apiUrlLog"] = "${API_URL_LOG}";
  })(this);