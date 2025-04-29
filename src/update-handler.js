const { autoUpdater } = require('electron-updater');
const { ipcMain } = require('electron');

module.exports = (mainWindow) => {
  autoUpdater.autoDownload = false; // Let users choose when to download
  autoUpdater.autoInstallOnAppQuit = true; // Auto-install on app close

  // Check for updates when the app starts
  autoUpdater.checkForUpdates();

  // Listen for update events
  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('update:available', info);
  });

  autoUpdater.on('update-downloaded', (info) => {
    mainWindow.webContents.send('update:downloaded', info);
  });

  autoUpdater.on('error', (error) => {
    mainWindow.webContents.send('update:error', error);
  });

  // Handle IPC calls from the renderer
  ipcMain.handle('update:download', () => autoUpdater.downloadUpdate());
  ipcMain.handle('update:install', () => autoUpdater.quitAndInstall());
};