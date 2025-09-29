const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');
require('dotenv').config();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function getIconPath() {
  const basePaths = [
    // Development paths (webpack)
    path.join(__dirname, '..', 'Assets', 'Icons'),
    path.join(__dirname, 'Assets', 'Icons'),

    // Production paths
    path.join(process.resourcesPath, 'Assets', 'Icons'),
    path.join(__dirname, '..', '..', 'Assets', 'Icons'),
  ];

  const ext = process.platform === 'win32' ? '.ico' :
    process.platform === 'darwin' ? '.icns' : '.png';

  for (const basePath of basePaths) {
    const fullPath = path.join(basePath, `icon${ext}`);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  console.error('Icon not found in any location');
  return null;
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    icon: getIconPath(),
  });

  // maximize the window
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once("ready-to-show", () => {
    if (app.isPackaged) {
      // Check for updates when app is ready
      autoUpdater.checkForUpdatesAndNotify();
    }
  });

  // Modify headers to allow necessary requests
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; " +
          "connect-src 'self' http://res.cloudinary.com https://pharma-back-production.up.railway.app ws://pharma-back-production.up.railway.app wss://pharma-back-production.up.railway.app http://localhost:10000 ws://localhost:10000 wss://localhost:10000 ws://api.pharmaexpress.app wss://api.pharmaexpress.app https://maps.googleapis.com; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; " +
          "img-src 'self' data: http://res.cloudinary.com https://*.tile.openstreetmap.org https://maps.googleapis.com https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.googleusercontent.com https://fonts.gstatic.com; " +
          "font-src 'self' https://fonts.gstatic.com;"
        ]
      }
    });
  });

  return mainWindow;
};

// Auto-updater event handlers
autoUpdater.on("checking-for-update", () => {
  console.log("Checking for update...");
});

autoUpdater.on("update-available", (info) => {
  console.log("Update available.");
  dialog.showMessageBox({
    type: "info",
    title: "Mise à jour disponible",
    message: `Une nouvelle version (${info.version}) de Pharma Express est disponible. Voulez-vous la télécharger ?`,
    buttons: ["Télécharger", "Plus tard"],
    defaultId: 0,
    cancelId: 1
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

autoUpdater.on("update-not-available", (info) => {
  console.log("Update not available.");
});

autoUpdater.on("error", (err) => {
  console.log("Error in auto-updater. " + err);
});

autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
  console.log(log_message);
});

autoUpdater.on("update-downloaded", (info) => {
  console.log("Update downloaded");
  dialog.showMessageBox({
    type: "info",
    title: "Mise à jour prête",
    message: `La mise à jour vers la version ${info.version} a été téléchargée. Redémarrer l'application pour appliquer ?`,
    buttons: ["Redémarrer maintenant", "Plus tard"],
    defaultId: 0,
    cancelId: 1
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

// Menu template - DEFINE BEFORE USING
const template = [
  {
    label: 'Aide',
    submenu: [
      {
        label: 'Vérifier les mises à jour',
        click: () => {
          if (app.isPackaged) {
            autoUpdater.checkForUpdatesAndNotify();
          } else {
            dialog.showMessageBox({
              type: 'info',
              title: 'Mode développement',
              message: 'Les mises à jour ne sont disponibles qu\'en mode production.'
            });
          }
        }
      }
    ]
  }
];

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  // Set up menu FIRST
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  
  // Then create window
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});