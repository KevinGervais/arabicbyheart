const {
  app,
  BrowserWindow,
  shell
} = require('electron')
const menubar = require('./menubar/menubar.js')
const windowStateKeeper = require('electron-window-state')

const isDev = process.argv.includes("dev")
menubar(app, isDev)
const isLocal = process.argv.includes("local")
app.once('ready', () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 550,
    defaultHeight: 430
  })
  const window = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 275,
    minHeight: 275,
    titleBarStyle: 'hidden',
    show: false,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
    }
  })
  mainWindowState.manage(window);
  (isDev && isLocal) ? window.loadURL('http://localhost:4000') : window.loadFile('./build/index.html')

  window.once('ready-to-show', () => {
    window.show()
  })

  window.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  })
})