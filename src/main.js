const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const fs = require('fs');
const { updateElectronApp } = require('update-electron-app');
const https = require('https');
const { dialog } = require('electron');

async function fetchLatestVersion() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/hiche-m/pharmaDesk-master/releases/latest',
      headers: {
        'User-Agent': 'pharma-exp-desk' // GitHub requires this
      }
    };

    https.get(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const release = JSON.parse(data);
        resolve(release.tag_name); // Returns something like "v1.0.3"
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

updateElectronApp(); // additional configuration options available

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
      /* devTools: false, */
    },
    autoHideMenuBar: true,
    icon: getIconPath(),
  });

  // maximize the window
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Modify headers to allow https://pharma-express-00ro.onrender.com requests
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' http://res.cloudinary.com;" +
          " connect-src 'self' ws://pharma-back.onrender.com https://pharma-express-00ro.onrender.com http://res.cloudinary.com http://localhost:10000 ws://localhost:10000;" +
          " img-src 'self' http://res.cloudinary.com data:;" +
          " script-src 'self' 'unsafe-inline' 'unsafe-eval';" +
          " style-src 'self' 'unsafe-inline';"
        ]
      }
    });
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  /* mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.webContents.closeDevTools(); // Force-close if somehow opened
  }); */
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  /* const currentVersion = app.getVersion();
  fetchLatestVersion()
    .then(latestVersion => {
      if (currentVersion !== latestVersion) {
        // Import dialog module since it's used here
        dialog.showErrorBox("Update Required", "Please restart the app to install the latest update.");
        app.quit();
      }
    })
    .catch(err => {
      console.error('Failed to check for updates:', err);
    }); */

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  if (!app.isPackaged) return;
});
/* 
// Set up HTTP and Socket.IO server
const server = http.createServer();
const io = new Server(server);

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle events here
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Send a response back to the client
    socket.emit('reply', 'Message received on server');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
}); */

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
