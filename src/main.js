const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { Server } = require('socket.io');
const http = require('http');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 512,
    minHeight: 420,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    autoHideMenuBar: true,
  });

  // maximize the window
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Modify headers to allow https://pharma-back.onrender.com requests
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' http://res.cloudinary.com;" +
          " connect-src 'self' ws://pharma-back.onrender.com https://pharma-back.onrender.com http://res.cloudinary.com;" +
          " img-src 'self' http://res.cloudinary.com data:;" +
          " script-src 'self' 'unsafe-inline' 'unsafe-eval';" +
          " style-src 'self' 'unsafe-inline';"
        ]
      }
    });
  });

  // Open the DevTools.
  /* mainWindow.webContents.openDevTools(); */
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
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
