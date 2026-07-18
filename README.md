# Leaf

[RU](#leaf--заметки-для-windows) · [EN](#leaf--notes-for-windows)

`v1.5.1`

---

## Leaf — заметки для Windows

Минималистичные заметки: папки и умные папки, теги (#), поиск, закреплённые,
чек-листы, таблицы, картинки, форматирование, корзина, блокировка паролем
(AES-256), мультиокно, тёмная тема, переключение языка (RU/EN) и **тихое
автообновление**. Все данные хранятся только на вашем компьютере.

Стек: Electron + чистый HTML/CSS/JS, без фреймворков. Шрифт Inter зашит
в приложение и работает офлайн.

### Скачать

Последний установщик `.exe` — на странице [Releases](https://github.com/ParkerShot/Leaf/releases).

### Что внутри
- `main.js`     — окно приложения, хранение, шифрование, экспорт PDF, автообновление
- `preload.js`  — мост Electron (`notesAPI`)
- `index.html`  — разметка (подключает `styles.css` и `app.js`)
- `styles.css`  — все стили
- `app.js`      — вся логика
- `icon.ico`    — иконка приложения
- `fonts/`      — шрифт Inter (офлайн)

> `index.html`, `styles.css` и `app.js` работают только все вместе.

### Запуск из исходников

Нужен только Node.js.

```
npm install      # скачает Electron (1–3 мин, нужен интернет)
npm start        # запустит приложение
```

### Сборка установщика .exe

```
npm run build
```

Появится папка `dist` с файлом `Leaf Setup 1.5.1.exe`.

#### Если сборка падает на скачивании (таймаут GitHub)
```
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
set ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
```

#### Если ошибка «Cannot create symbolic link»
Параметры (Win+I) → Конфиденциальность и защита → Для разработчиков → Режим разработчика. Затем снова `npm run build`.

### Автообновление

Leaf проверяет обновления при запуске. Когда доступна новая версия, рядом
с кнопкой языка (внизу слева) появляется значок. Клик → обновление скачивается
в фоне → приложение перезапускается уже обновлённым. Заметки не затрагиваются.

#### Выпуск новой версии
1. Поднять `version` в `package.json`.
2. Собрать и опубликовать:
   ```
   set GH_TOKEN=ваш_токен
   npm run release
   ```

> `GH_TOKEN` — персональный токен GitHub с правом `public_repo`. Создаётся
> в Settings → Developer settings → Personal access tokens.

### Где хранятся заметки
```
C:\Users\ВашеИмя\AppData\Roaming\Leaf\notes-data.json
```
Заметки под паролем хранятся зашифрованными (AES-256). При деинсталляции данные **не** удаляются.

### Лицензия
MIT — см. файл `LICENSE`.

---

## Leaf — notes for Windows

A minimalist notes app: folders and smart folders, tags (#), search, pinned
notes, checklists, tables, images, formatting, trash, password-protected notes
(AES-256), multi-window, dark theme, language toggle (RU/EN) and **silent
auto-updates**. All data stays on your computer.

Stack: Electron + plain HTML/CSS/JS, no frameworks. Inter font is bundled and works offline.

### Download

Latest `.exe` installer on the [Releases](https://github.com/ParkerShot/Leaf/releases) page.

### Project files
- `main.js`     — main process: window, storage, encryption, PDF export, auto-update
- `preload.js`  — Electron bridge (`notesAPI`)
- `index.html`  — markup (loads `styles.css` and `app.js`)
- `styles.css`  — all styles
- `app.js`      — all logic
- `icon.ico`    — app icon
- `fonts/`      — Inter font (offline)

> `index.html`, `styles.css` and `app.js` only work together.

### Run from source

You only need Node.js.

```
npm install      # downloads Electron (1–3 min, requires internet)
npm start        # launches the app
```

### Build the .exe installer

```
npm run build
```

A `dist` folder will appear with `Leaf Setup 1.5.1.exe`.

#### If the build fails on download (GitHub timeout)
```
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
set ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
```

#### If you get "Cannot create symbolic link"
Settings (Win+I) → Privacy & security → For developers → Developer Mode. Then run `npm run build` again.

### Auto-update

Leaf checks for updates on launch. When a new version is available, a subtle
icon appears next to the language button (bottom left). Click it → downloads
silently in the background → app restarts updated. Notes are not touched.

#### Releasing a new version
1. Bump `version` in `package.json`.
2. Build and publish:
   ```
   set GH_TOKEN=your_token
   npm run release
   ```

> `GH_TOKEN` is a GitHub personal access token with `public_repo` scope.
> Create one in Settings → Developer settings → Personal access tokens.

### Where notes are stored
```
C:\Users\YourName\AppData\Roaming\Leaf\notes-data.json
```
Password-protected notes are encrypted (AES-256). Uninstalling does **not** delete notes.

### License
MIT — see `LICENSE`.
