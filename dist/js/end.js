var {
	ipcRenderer
} = require('electron')

function get_score() {
	ipcRenderer.send("score");
}

ipcRenderer.on('score', (sender, score) => {
	document.getElementById('ask').innerHTML = score;
})