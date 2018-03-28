const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
	win = new BrowserWindow()
	win.maximize()
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'dist/html/index.html'),
		protocol: 'file:',
		slashes: true
	}))

	win.once('ready-to-show', () => {
		win.show()
	})

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})

// Start main code

var fs = require('fs');
var json;
var json_array = new Array;
var question_array = new Array;
var arr;
var id = 0;
var score = 0.0;

ipcMain.on('start', (event) => {
	json = JSON.parse(fs.readFileSync('dist/ask.json'))
	arr = Object.values(json)
	event.sender.send('question', arr[id])
})

ipcMain.on('next', (event) => {
	if (id >= arr.length - 1) {
		win.loadURL(url.format({
			pathname: path.join(__dirname, 'dist/html/end.html'),
			protocol: 'file:',
			slashes: true
		}))
	}
	id += 1;
	event.sender.send('question', arr[id])
})

ipcMain.on('answer', (event, ans_id) => {
	if (ans_id == arr[id].good) {
		score += 1;
	} else {
		score -= 0.5;
	}
	console.log("score: " + score);
	event.sender.send('back', arr[id]);
})

ipcMain.on('score', (event) => {
	event.sender.send('score', `Score: ${score} / ${arr.length}`)
})