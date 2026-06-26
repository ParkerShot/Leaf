const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('notesAPI', {
  load: () => ipcRenderer.invoke('store:load'),
  save: (data) => ipcRenderer.invoke('store:save', data),
  encrypt: (text, pass) => ipcRenderer.invoke('crypto:encrypt', text, pass),
  decrypt: (blob, pass) => ipcRenderer.invoke('crypto:decrypt', blob, pass),
  exportPdf: (data) => ipcRenderer.invoke('note:exportPdf', data),
  openNoteWindow: (id) => ipcRenderer.invoke('window:openNote', id),
  onStoreChanged: (cb) => ipcRenderer.on('store:changed', () => cb()),
  // ---- Автообновление ----
  updateCheck: () => ipcRenderer.invoke('updater:check'),
  updateDownload: () => ipcRenderer.invoke('updater:download'),
  updateInstall: () => ipcRenderer.invoke('updater:install'),
  onUpdateStatus: (cb) => ipcRenderer.on('updater:status', (e, data) => cb(data))
});
