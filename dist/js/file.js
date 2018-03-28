var {
	ipcRenderer
} = require('electron')

function start_game() {
	ipcRenderer.send("start");
}

//Send answer to server and get info back
function ans(id) {
	if (id == 0) {
		document.getElementById("btn0").className = "btn btn-danger btn-block"
	}
	else if (id == 1) {
		document.getElementById("btn1").className = "btn btn-danger btn-block"
	}
	else if (id == 2) {
		document.getElementById("btn2").className = "btn btn-danger btn-block"
	}
	else if (id == 3) {
		document.getElementById("btn3").className = "btn btn-danger btn-block"
	}
	document.getElementById("btn0").disabled = true
	document.getElementById("btn1").disabled = true
	document.getElementById("btn2").disabled = true
	document.getElementById("btn3").disabled = true
	ipcRenderer.send('answer', id)
}

// Load next question
function next() {
	//Reset class / disable
	document.getElementById("btn0").disabled = false
	document.getElementById("btn1").disabled = false
	document.getElementById("btn2").disabled = false
	document.getElementById("btn3").disabled = false
	document.getElementById("btn0").className = "btn btn-outline-primary btn-block"
	document.getElementById("btn1").className = "btn btn-outline-primary btn-block"
	document.getElementById("btn2").className = "btn btn-outline-primary btn-block"
	document.getElementById("btn3").className = "btn btn-outline-primary btn-block"
	ipcRenderer.send('next')
}

ipcRenderer.on('question', (sender, json) => {
	document.getElementById("ask").innerHTML = json.question
	document.getElementById("btn0").innerHTML = json.answer[0]
	document.getElementById("btn1").innerHTML = json.answer[1]
	document.getElementById("btn2").innerHTML = json.answer[2]
	document.getElementById("btn3").innerHTML = json.answer[3]
})

ipcRenderer.on('next', (sender, json) => {
	document.getElementById("ask").innerHTML = json.question
	document.getElementById("btn0").innerHTML = json.answer[0]
	document.getElementById("btn1").innerHTML = json.answer[1]
	document.getElementById("btn2").innerHTML = json.answer[2]
	document.getElementById("btn3").innerHTML = json.answer[3]
})

ipcRenderer.on('back', (sender, json) => {
	if (json.good == 0)
		document.getElementById("btn0").className = "btn btn-success btn-block"
	if (json.good == 1)
		document.getElementById("btn1").className = "btn btn-success btn-block"
	if (json.good == 2)
		document.getElementById("btn2").className = "btn btn-success btn-block"
	if (json.good == 3)
		document.getElementById("btn3").className = "btn btn-success btn-block"
})