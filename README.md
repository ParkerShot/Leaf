# Leaf

**[🇷🇺 Русский](#-leaf--заметки-для-windows) · [🇬🇧 English](#-leaf--notes-app-for-windows)**

---

## 🇷🇺 Leaf — заметки для Windows

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

Появится папка `dist` с файлом `Leaf Setup 1.5.0.exe`.

#### Если сборка падает на скачивании (таймаут GitHub)
Перед сборкой задайте зеркало в том же окне:
```
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
set ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
```

#### Если ошибка «Cannot create symbolic link»
Включите Режим разработчика: Параметры (Win+I) → Конфиденциальность и
защита → Для разработчиков → Режим разработчика. Затем снова `npm run build`.

### Автообновление (GitHub Releases)

Leaf проверяет обновления при запуске. Когда доступна новая версия, рядом
с кнопкой языка (внизу слева) появляется неброский значок. Клик по нему →
обновление тихо скачивается в фоне → приложение перезапускается уже
обновлённым. Заметки при этом не затрагиваются.

#### Как выпустить новую версию
1. Поднимите номер в `package.json` (поле `version`).
2. Соберите и опубликуйте релиз:
   ```
   set GH_TOKEN=ваш_personal_access_token
   npm run release
   ```
3. У пользователей на запуске появится значок обновления.

> `GH_TOKEN` — персональный токен GitHub с правом `repo` (или `public_repo`
> для публичного репозитория). Создаётся в Settings → Developer settings →
> Personal access tokens.

#### Про «неизвестного издателя»
Без платного сертификата подписи кода Windows SmartScreen может один раз
показать «неизвестный издатель» при **первой ручной** установке. Дальнейшие
автообновления проходят тихо.

### Где хранятся заметки
```
C:\Users\ВашеИмя\AppData\Roaming\Leaf\notes-data.json
```
Заметки под паролем хранятся в зашифрованном виде (AES-256). Если забыть
пароль, заметку не открыть — восстановления нет. При деинсталляции данные
**не** удаляются.

### Лицензия
MIT — см. файл `LICENSE`.

---

## 🇬🇧 Leaf — notes app for Windows

A minimalist notes app: folders and smart folders, tags (#), search, pinned
notes, checklists, tables, images, formatting, trash, password-protected
notes (AES-256), multi-window, dark theme, language toggle (RU/EN) and
**silent auto-updates**. All data stays on your computer.

Stack: Electron + plain HTML/CSS/JS, no frameworks. The Inter font is bundled
and works offline.

### Download

Get the latest `.exe` installer from the [Releases](https://github.com/ParkerShot/Leaf/releases) page.

### Project files
- `main.js`     — Electron main process: window, storage, encryption, PDF export, auto-update
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

A `dist` folder will appear with `Leaf Setup 1.5.0.exe`.

#### If the build fails on download (GitHub timeout)
Set a mirror before building, in the same shell:
```
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
set ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
```

#### If you get "Cannot create symbolic link"
Enable Developer Mode: Settings (Win+I) → Privacy & security → For developers
→ Developer Mode. Then run `npm run build` again.

### Auto-update (GitHub Releases)

Leaf checks for updates on launch. When a new version is available, a subtle
icon appears next to the language button (bottom left). Click it → the update
downloads silently in the background → the app restarts on the new version.
Your notes are not touched.

#### Releasing a new version
1. Bump the `version` field in `package.json`.
2. Build and publish:
   ```
   set GH_TOKEN=your_personal_access_token
   npm run release
   ```
3. Users will see the update icon on next launch.

> `GH_TOKEN` is a GitHub personal access token with `repo` scope (or
> `public_repo` for public repos). Create one in Settings → Developer
> settings → Personal access tokens.

#### About "unknown publisher"
Without a paid code-signing certificate, Windows SmartScreen may show
"unknown publisher" on the **first manual install**. Subsequent auto-updates
are silent.

### Where notes are stored
```
C:\Users\YourName\AppData\Roaming\Leaf\notes-data.json
```
Password-protected notes are stored encrypted (AES-256). If you forget the
password, the note cannot be recovered. Uninstalling the app does **not**
delete your notes.

### License
MIT — see `LICENSE`.
