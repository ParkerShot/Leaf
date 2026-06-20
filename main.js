const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// ---- Хранилище: один JSON-файл в папке профиля приложения ----
function storeFile() {
  return path.join(app.getPath('userData'), 'notes-data.json');
}

function loadStore() {
  try {
    return JSON.parse(fs.readFileSync(storeFile(), 'utf-8'));
  } catch (e) {
    return null; // файла ещё нет — интерфейс подставит стартовые данные
  }
}

function saveStore(data) {
  try {
    fs.writeFileSync(storeFile(), JSON.stringify(data), 'utf-8');
    return true;
  } catch (e) {
    console.error('Ошибка сохранения:', e);
    return false;
  }
}

// ---- Настоящее шифрование заметок под паролем (AES-256-GCM) ----
function encrypt(text, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.scryptSync(password, salt, 32);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [salt.toString('hex'), iv.toString('hex'), tag.toString('hex'), enc.toString('hex')].join(':');
}

function decrypt(blob, password) {
  try {
    const [s, i, t, e] = blob.split(':');
    const key = crypto.scryptSync(password, Buffer.from(s, 'hex'), 32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(i, 'hex'));
    decipher.setAuthTag(Buffer.from(t, 'hex'));
    const dec = Buffer.concat([decipher.update(Buffer.from(e, 'hex')), decipher.final()]);
    return { ok: true, text: dec.toString('utf-8') };
  } catch (e) {
    return { ok: false }; // неверный пароль или повреждённые данные
  }
}

function createWindow(focusId) {
  const win = new BrowserWindow({
    width: focusId ? 720 : 1080,
    height: focusId ? 640 : 720,
    minWidth: focusId ? 420 : 720,
    minHeight: 460,
    backgroundColor: '#f2f2f7',
    title: 'Leaf',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile('index.html', focusId ? { query: { focus: String(focusId) } } : undefined);
}

// открыть отдельную заметку в новом окне
ipcMain.handle('window:openNote', (e, id) => { createWindow(id); return true; });

// разослать остальным окнам сигнал, что данные на диске изменились
function broadcastChange(senderWebContents) {
  for (const w of BrowserWindow.getAllWindows()) {
    if (w.webContents !== senderWebContents) w.webContents.send('store:changed');
  }
}

ipcMain.handle('store:load', () => loadStore());
ipcMain.handle('store:save', (e, data) => { const ok = saveStore(data); broadcastChange(e.sender); return ok; });
ipcMain.handle('crypto:encrypt', (e, text, pass) => encrypt(text, pass));
ipcMain.handle('crypto:decrypt', (e, blob, pass) => decrypt(blob, pass));

// ---- Экспорт заметки в PDF ----
ipcMain.handle('note:exportPdf', async (e, { title, html }) => {
  const style = `
    body{font-family:'Segoe UI',Arial,sans-serif;color:#1c1c1e;padding:48px 56px;line-height:1.5;font-size:15px}
    h1{font-size:24px;margin:0 0 18px}
    h2{font-size:20px} h3{font-size:17px}
    ul,ol{padding-left:24px} li{margin:3px 0}
    ul.checklist{list-style:none;padding-left:0}
    .check-item{display:flex;gap:8px;align-items:flex-start;margin:4px 0}
    .check-box{width:15px;height:15px;border:1.5px solid #999;border-radius:50%;flex-shrink:0;margin-top:2px}
    .check-box svg{display:none}
    .check-item.done .check-box{background:#f5b800;border-color:#f5b800}
    .check-item.done .check-text{text-decoration:line-through;color:#999}
    table{border-collapse:collapse;margin:8px 0} td{border:1px solid #ccc;padding:6px 10px}
    img{max-width:100%;border-radius:8px} mark{background:#fff3a3}
    blockquote{border-left:3px solid #f5b800;margin:6px 0;padding-left:12px;color:#666}
  `;
  const full = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${style}</style></head><body><h1>${(title||'').replace(/[<>&]/g,'')}</h1>${html||''}</body></html>`;
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
  try {
    await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(full));
    const pdf = await win.webContents.printToPDF({ printBackground: true, pageSize: 'A4' });
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: (title || 'note').replace(/[\\/:*?"<>|]/g, '') + '.pdf',
      filters: [{ name: 'PDF', extensions: ['pdf'] }]
    });
    if (canceled || !filePath) return { ok: false };
    fs.writeFileSync(filePath, pdf);
    return { ok: true };
  } catch (err) {
    console.error('PDF error:', err);
    return { ok: false };
  } finally {
    win.close();
  }
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
