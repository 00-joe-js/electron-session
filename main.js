const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')

function createWindow() {

    const devtools = new BrowserWindow()
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: true
        }
    })

    win.loadFile('index.html')
    win.webContents.setDevToolsWebContents(devtools.webContents)
    win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(() => {
    const test = new Notification({title: "Hello there", body: "you are beautiful"});
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { // darwin === macOS
        app.quit()
    }
})