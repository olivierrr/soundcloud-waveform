
var WAVEFORM = function(options) {

	this.container = options.container
	this.height = options.height || 100
	this.width = options.width || 300
	this.waveform = options.waveform 
	this.lines = options.lines || 100

	this.gutter = options.gutter || 3

}

WAVEFORM.prototype.init = function() {

	console.log('init')
	
	// create canvas
	var canvas = document.createElement('canvas')
	canvas.width = this.width
	canvas.height = this.height

	// get canvas context
	this.ctx = canvas.getContext('2d')

	// append canvas
	this.container.appendChild(canvas)

	//render
	this.draw()

}

WAVEFORM.prototype.update = function(options) {

	console.log('update')

	if(options) {

		if(options.gradient) console.log('awdwd')
		if(options.lines) console.log('awdwd')
		if(options.width) console.log('awdwd')
		if(options.height) console.log('awdwd')

	}

	//render
	this.draw()
}

WAVEFORM.prototype.draw = function() {

	console.log('draw')

	var waves = this.waves || (this.waves = this.genWaves())

	var xPos = 0
	var yPos = 0

	//should be on init // should be updatedable
	gradient = this.ctx.createLinearGradient(0,100,0,0)
	gradient.addColorStop(0, '#333333')
	gradient.addColorStop(1, '#3D3D3D')
	
	for(var i=0; i<waves.length; i+=1) {

		// main bar
		this.ctx.fillStyle = gradient
		this.ctx.fillRect(xPos, 100, 3, Math.floor(-Math.abs(waves[i]*100)))

		// gutter
		this.ctx.fillStyle = 'blue'
		var smaller = Math.min(waves[i],waves[i+1])
		this.ctx.fillRect(xPos + this.gutter, 100, 3, Math.floor(-Math.abs(smaller*100)))
		
		// bar reflection
		this.ctx.fillStyle = 'red'		
		this.ctx.fillRect(xPos, 100, 3, Math.floor(waves[i]*10))

		xPos += 6
	}

}

WAVEFORM.prototype.genWaves = function() {

	console.log('genWaves')

	var result, waves, temp, i

	result = (this.waveform.length / this.lines)
	waves = []
	temp = 0

	for(i=0; i<this.waveform.length; i+=1) {

		temp += this.waveform[i]

		if(i%result === 0 && i !== 0) {
			waves.push(temp/result)
			temp = 0
		}
	}
	return waves
}


//test

window.o = new WAVEFORM({
    container: document.body,
    waveform: [0.9285714285714286,0.7071428571428572,0.9714285714285714,0.7642857142857142,0.7785714285714286,0.9428571428571428,0.6857142857142857,0.85,0.8142857142857143,0.5714285714285714,0.9285714285714286,0.7071428571428572,0.9142857142857143,0.8428571428571429,0.7928571428571428,0.9142857142857143,0.7285714285714285,0.6714285714285714,0.9357142857142857,0.6285714285714286,0.9285714285714286,0.7214285714285714,0.7785714285714286,0.95,0.8071428571428572,0.9,0.7642857142857142,0.5142857142857142,0.9428571428571428,0.6642857142857143,0.9,0.75,0.7714285714285715,0.95,0.8142857142857143,0.8714285714285714,0.85,0.7642857142857142,0.9428571428571428,0.7,0.8142857142857143,0.8214285714285714,0.7642857142857142,0.9428571428571428,0.8285714285714286,0.7928571428571428,0.8928571428571429,0.6285714285714286,0.9357142857142857,0.7285714285714285,0.4642857142857143,0.9571428571428572,0.6928571428571428,0.9571428571428572,0.8285714285714286,0.6857142857142857,0.9428571428571428,0.6571428571428571,0.9142857142857143,0.7428571428571429,0.5285714285714286,0.95,0.6642857142857143,0.9642857142857143,0.7928571428571428,0.7714285714285715,0.9357142857142857,0.6928571428571428,0.85,0.7928571428571428,0.5571428571428572,0.9214285714285714,0.7142857142857143,0.9,0.8714285714285714,0.7928571428571428,0.9285714285714286,0.7142857142857143,0.8214285714285714,0.9285714285714286,0.6071428571428571,0.8857142857142857,0.7571428571428571,0.8071428571428572,0.95,0.7928571428571428,0.9214285714285714,0.7357142857142858,0.5214285714285715,0.95,0.6857142857142857,0.8928571428571429,0.7785714285714286,0.7714285714285715,0.9357142857142857,0.8071428571428572,0.8928571428571429,0.7642857142857142,0.5785714285714286,0.9357142857142857,0.6928571428571428,0.8,0.8571428571428571,0.7428571428571429,0.95,0.8142857142857143,0.7714285714285715,0.8928571428571429,0.6142857142857143,0.9071428571428571,0.7357142857142858,0.4857142857142857,0.9571428571428572,0.6928571428571428,0.9785714285714285,0.7928571428571428,0.6928571428571428,0.9785714285714285,0.6714285714285714,0.9714285714285714,0.7714285714285715,0.7642857142857142,0.9357142857142857,0.6928571428571428,0.9714285714285714,0.7714285714285715,0.7714285714285715,0.95,0.7071428571428572,0.8357142857142857,0.8357142857142857,0.6857142857142857,0.9285714285714286,0.7142857142857143,0.9142857142857143,0.85,0.7857142857142857,0.9142857142857143,0.7428571428571429,0.6142857142857143,0.9428571428571428,0.65,0.9214285714285714,0.7285714285714285,0.7785714285714286,0.9571428571428572,0.8,0.8928571428571429,0.8,0.5714285714285714,0.95,0.6714285714285714,0.9071428571428571,0.7571428571428571,0.7928571428571428,0.95,0.8214285714285714,0.8928571428571429,0.8142857142857143,0.7642857142857142,0.95,0.7428571428571429,0.8285714285714286,0.8285714285714286,0.8142857142857143,0.9428571428571428,0.8142857142857143,0.7642857142857142,0.9142857142857143,0.6785714285714286,0.9357142857142857,0.7285714285714285,0.5714285714285714,0.9571428571428572,0.7142857142857143,0.9642857142857143,0.8,0.7357142857142858,0.9428571428571428,0.6642857142857143,0.9071428571428571,0.75,0.5357142857142857,0.95,0.7571428571428571,0.9714285714285714,0.8,0.7857142857142857,0.9357142857142857,0.7142857142857143,0.8571428571428571,0.8,0.5857142857142857,0.9285714285714286,0.7642857142857142,0.9214285714285714,0.8857142857142857,0.8071428571428572,0.9214285714285714,0.7857142857142857,0.7928571428571428,0.9428571428571428,0.6785714285714286,0.9571428571428572,0.7785714285714286,0.85,0.95,0.8071428571428572,0.9142857142857143,0.7357142857142858,0.5214285714285715,0.95,0.6571428571428571,0.8785714285714286,0.7857142857142857,0.7714285714285715,0.9428571428571428,0.8142857142857143,0.8857142857142857,0.7785714285714286,0.5785714285714286,0.9357142857142857,0.6928571428571428,0.7857142857142857,0.8642857142857143,0.8285714285714286,0.9571428571428572,0.8142857142857143,0.75,0.9071428571428571,0.6071428571428571,0.9071428571428571,0.7357142857142858,0.4714285714285714,0.9571428571428572,0.7785714285714286,0.9857142857142858,0.7857142857142857,0.7142857142857143,0.95,0.6428571428571429,0.9642857142857143,0.7714285714285715,0.75,0.9357142857142857,0.75,0.9714285714285714,0.7642857142857142,0.7857142857142857,0.9357142857142857,0.6785714285714286,0.8714285714285714,0.8285714285714286,0.6857142857142857,0.9071428571428571,0.6928571428571428,0.8857142857142857,0.8357142857142857,0.7714285714285715,0.8857142857142857,0.7071428571428572,0.6785714285714286,0.9214285714285714,0.6857142857142857,0.8785714285714286,0.7071428571428572,0.7857142857142857,0.9071428571428571,0.7571428571428571,0.8428571428571429,0.7214285714285714,0.6214285714285714,0.9,0.6785714285714286,0.8285714285714286,0.7,0.7571428571428571,0.8857142857142857,0.7357142857142858,0.7642857142857142,0.8,0.6571428571428571,0.8571428571428571,0.6142857142857143,0.8142857142857143,0.7428571428571429,0.7071428571428572,0.85,0.7071428571428572,0.6142857142857143,0.8142857142857143,0.5428571428571428,0.8285714285714286,0.65,0.5285714285714286,0.8,0.5571428571428572,0.8214285714285714,0.7,0.5857142857142857,0.7642857142857142,0.5,0.7571428571428571,0.6928571428571428,0.5357142857142857,0.7357142857142858,0.6071428571428571,0.7714285714285715,0.7214285714285714,0.6571428571428571,0.7071428571428572,0.4785714285714286,0.7142857142857143,0.7571428571428571,0.6,0.6571428571428571,0.6071428571428571,0.7571428571428571,0.75,0.8214285714285714,0.7428571428571429,0.8,0.8785714285714286,0.8642857142857143,0.7714285714285715,0.8428571428571429,0.7785714285714286,0.7785714285714286,0.7785714285714286,0.7928571428571428,0.8071428571428572,0.8214285714285714,0.8,0.8142857142857143,0.7714285714285715,0.7142857142857143,0.6928571428571428,0.7357142857142858,0.7357142857142858,0.7285714285714285,0.8142857142857143,0.7857142857142857,0.7642857142857142,0.7428571428571429,0.7571428571428571,0.7,0.7071428571428572,0.7357142857142858,0.7357142857142858,0.7142857142857143,0.7714285714285715,0.8142857142857143,0.7785714285714286,0.7714285714285715,0.7642857142857142,0.75,0.7571428571428571,0.7,0.75,0.7285714285714285,0.7928571428571428,0.8,0.7785714285714286,0.7785714285714286,0.7642857142857142,0.6785714285714286,0.8071428571428572,0.7714285714285715,0.8071428571428572,0.7071428571428572,0.8071428571428572,0.7785714285714286,0.8214285714285714,0.7857142857142857,0.8071428571428572,0.7357142857142858,0.7714285714285715,0.7428571428571429,0.7642857142857142,0.7357142857142858,0.7571428571428571,0.7928571428571428,0.8142857142857143,0.7928571428571428,0.7928571428571428,0.7571428571428571,0.7428571428571429,0.7285714285714285,0.75,0.7357142857142858,0.7714285714285715,0.7785714285714286,0.7857142857142857,0.7642857142857142,0.7785714285714286,0.7642857142857142,0.7714285714285715,0.7357142857142858,0.7285714285714285,0.7214285714285714,0.7357142857142858,0.7285714285714285,0.7785714285714286,0.75,0.7714285714285715,0.7642857142857142,0.7071428571428572,0.8285714285714286,0.7928571428571428,0.7571428571428571,0.7857142857142857,0.7714285714285715,0.7357142857142858,0.8,0.7571428571428571,0.7714285714285715,0.7357142857142858,0.7285714285714285,0.7928571428571428,0.75,0.7428571428571429,0.7928571428571428,0.7214285714285714,0.8071428571428572,0.7714285714285715,0.7642857142857142,0.7642857142857142,0.7214285714285714,0.8071428571428572,0.7857142857142857,0.7357142857142858,0.8,0.7071428571428572,0.8071428571428572,0.7714285714285715,0.7642857142857142,0.8,0.75,0.8,0.8,0.75,0.7928571428571428,0.7214285714285714,0.7857142857142857,0.7714285714285715,0.75,0.7857142857142857,0.7571428571428571,0.7642857142857142,0.7857142857142857,0.7571428571428571,0.8071428571428572,0.7428571428571429,0.7785714285714286,0.8142857142857143,0.75,0.7785714285714286,0.7571428571428571,0.7857142857142857,0.8142857142857143,0.7428571428571429,0.7857142857142857,0.7571428571428571,0.75,0.7928571428571428,0.7571428571428571,0.7785714285714286,0.7642857142857142,0.7357142857142858,0.7928571428571428,0.75,0.7928571428571428,0.8,0.7428571428571429,0.8071428571428572,0.7714285714285715,0.8214285714285714,0.8428571428571429,0.7928571428571428,0.8357142857142857,0.8571428571428571,0.7428571428571429,0.8285714285714286,0.8071428571428572,0.8214285714285714,0.85,0.8357142857142857,0.7928571428571428,0.9285714285714286,0.85,0.9785714285714285,0.8071428571428572,0.8642857142857143,0.95,0.85,0.9142857142857143,0.8928571428571429,0.85,0.9642857142857143,0.8571428571428571,0.9,0.9071428571428571,0.8571428571428571,0.95,0.8714285714285714,0.8642857142857143,0.9642857142857143,0.8785714285714286,0.9642857142857143,0.8571428571428571,0.8928571428571429,0.9428571428571428,0.8142857142857143,0.9428571428571428,0.8428571428571429,0.8071428571428572,0.9428571428571428,0.8928571428571429,0.95,0.85,0.8714285714285714,0.95,0.85,0.9357142857142857,0.9071428571428571,0.8714285714285714,0.95,0.8642857142857143,0.9285714285714286,0.8857142857142857,0.8785714285714286,0.9642857142857143,0.7857142857142857,0.8214285714285714,0.9571428571428572,0.8642857142857143,0.9571428571428572,0.8571428571428571,0.8785714285714286,0.9571428571428572,0.8142857142857143,0.9571428571428572,0.8142857142857143,0.8357142857142857,0.9428571428571428,0.8214285714285714,0.9785714285714285,0.8357142857142857,0.8714285714285714,0.95,0.8642857142857143,0.9571428571428572,0.8214285714285714,0.8714285714285714,0.95,0.8785714285714286,0.95,0.9,0.8857142857142857,0.9357142857142857,0.8714285714285714,0.8928571428571429,0.9142857142857143,0.85,0.9642857142857143,0.8428571428571429,0.8857142857142857,0.9285714285714286,0.8857142857142857,0.9214285714285714,0.8714285714285714,0.9,0.95,0.7714285714285715,0.9642857142857143,0.8357142857142857,0.8357142857142857,0.95,0.85,0.95,0.8642857142857143,0.8571428571428571,0.95,0.8214285714285714,0.9357142857142857,0.85,0.8285714285714286,0.9571428571428572,0.85,0.9142857142857143,0.9214285714285714,0.8857142857142857,0.9714285714285714,0.7857142857142857,0.8285714285714286,0.95,0.8357142857142857,0.95,0.8642857142857143,0.8714285714285714,0.9357142857142857,0.85,0.9857142857142858,0.8,0.8785714285714286,0.95,0.8642857142857143,0.95,0.8571428571428571,0.8857142857142857,0.9285714285714286,0.8428571428571429,0.9642857142857143,0.8142857142857143,0.85,0.95,0.85,0.9285714285714286,0.8928571428571429,0.8857142857142857,0.9428571428571428,0.8428571428571429,0.8785714285714286,0.9214285714285714,0.8285714285714286,0.95,0.85,0.8142857142857143,0.9428571428571428,0.85,0.9714285714285714,0.8357142857142857,0.8714285714285714,0.9428571428571428,0.7928571428571428,0.9428571428571428,0.8428571428571429,0.8214285714285714,0.95,0.8785714285714286,0.95,0.8571428571428571,0.8714285714285714,0.95,0.85,0.9285714285714286,0.9214285714285714,0.8928571428571429,0.95,0.8714285714285714,0.9071428571428571,0.8785714285714286,0.8,0.95,0.8285714285714286,0.8571428571428571,0.95,0.8357142857142857,0.9571428571428572,0.8214285714285714,0.8642857142857143,0.95,0.7785714285714286,0.9928571428571429,0.8,0.8928571428571429,0.9357142857142857,0.8642857142857143,0.9571428571428572,0.8571428571428571,0.8642857142857143,0.9357142857142857,0.7714285714285715,0.95,0.8214285714285714,0.8714285714285714,0.9357142857142857,0.8571428571428571,0.9428571428571428,0.8714285714285714,0.8357142857142857,0.95,0.7857142857142857,0.8428571428571429,0.9285714285714286,0.8714285714285714,0.9571428571428572,0.8285714285714286,0.8714285714285714,0.9428571428571428,0.8714285714285714,0.9357142857142857,0.8,0.8357142857142857,0.9357142857142857,0.8571428571428571,0.9642857142857143,0.8285714285714286,0.8214285714285714,0.9571428571428572,0.8428571428571429,0.95,0.8571428571428571,0.8071428571428572,0.9642857142857143,0.8571428571428571,0.9428571428571428,0.8857142857142857,0.8642857142857143,0.9714285714285714,0.8571428571428571,0.8928571428571429,0.9071428571428571,0.7857142857142857,0.9714285714285714,0.8285714285714286,0.8214285714285714,0.9571428571428572,0.8285714285714286,0.95,0.8428571428571429,0.8428571428571429,0.95,0.7214285714285714,0.9928571428571429,0.7857142857142857,0.8857142857142857,0.95,0.8642857142857143,0.95,0.85,0.8642857142857143,0.9357142857142857,0.8,0.9571428571428572,0.8142857142857143,0.8571428571428571,0.95,0.8285714285714286,0.9,0.8928571428571429,0.8071428571428572,0.9571428571428572,0.7857142857142857,0.8428571428571429,0.9285714285714286,0.8571428571428571,0.9428571428571428,0.8285714285714286,0.7928571428571428,0.9428571428571428,0.8142857142857143,0.95,0.7785714285714286,0.8071428571428572,0.95,0.8285714285714286,0.9285714285714286,0.8142857142857143,0.7785714285714286,0.9571428571428572,0.7857142857142857,0.9214285714285714,0.7928571428571428,0.7857142857142857,0.9571428571428572,0.8214285714285714,0.8785714285714286,0.8714285714285714,0.8071428571428572,0.95,0.8071428571428572,0.8571428571428571,0.9,0.8,0.9571428571428572,0.8142857142857143,0.7642857142857142,0.9571428571428572,0.7642857142857142,0.9571428571428572,0.7785714285714286,0.6928571428571428,0.95,0.75,0.9642857142857143,0.7928571428571428,0.8142857142857143,0.95,0.7571428571428571,0.9428571428571428,0.8,0.7142857142857143,0.9428571428571428,0.7428571428571429,0.9357142857142857,0.8428571428571429,0.8214285714285714,0.9428571428571428,0.7785714285714286,0.8571428571428571,0.8857142857142857,0.7428571428571429,0.9571428571428572,0.7285714285714285,0.7071428571428572,0.4928571428571429,0.7357142857142858,0.7714285714285715,0.7857142857142857,0.8071428571428572,0.8285714285714286,0.8285714285714286,0.7857142857142857,0.7857142857142857,0.7714285714285715,0.7714285714285715,0.7928571428571428,0.8214285714285714,0.8214285714285714,0.8071428571428572,0.8071428571428572,0.7714285714285715,0.7071428571428572,0.7142857142857143,0.7285714285714285,0.7428571428571429,0.7,0.75,0.7285714285714285,0.7428571428571429,0.7428571428571429,0.7642857142857142,0.7,0.7357142857142858,0.7285714285714285,0.7214285714285714,0.7071428571428572,0.7714285714285715,0.8071428571428572,0.7785714285714286,0.7571428571428571,0.7642857142857142,0.7571428571428571,0.7571428571428571,0.7,0.75,0.7071428571428572,0.8,0.7785714285714286,0.7428571428571429,0.7571428571428571,0.7571428571428571,0.6714285714285714,0.7928571428571428,0.7642857142857142,0.8,0.7214285714285714,0.8,0.7857142857142857,0.8214285714285714,0.7857142857142857,0.8142857142857143,0.75,0.7571428571428571,0.7428571428571429,0.7642857142857142,0.75,0.7571428571428571,0.7857142857142857,0.8142857142857143,0.8,0.7928571428571428,0.7571428571428571,0.7357142857142858,0.7214285714285714,0.7571428571428571,0.7428571428571429,0.75,0.7785714285714286,0.7928571428571428,0.7642857142857142,0.7714285714285715,0.7642857142857142,0.7642857142857142,0.7428571428571429,0.7142857142857143,0.7357142857142858,0.7428571428571429,0.7571428571428571,0.7857142857142857,0.75,0.7785714285714286,0.7642857142857142,0.7,0.8214285714285714,0.7714285714285715,0.7857142857142857,0.7357142857142858,0.8357142857142857,0.8428571428571429,0.8428571428571429,0.8142857142857143,0.8285714285714286,0.7142857142857143,0.7857142857142857,0.7428571428571429,0.8071428571428572,0.6857142857142857,0.8,0.7714285714285715,0.8071428571428572,0.7714285714285715,0.7785714285714286,0.7285714285714285,0.7714285714285715,0.7357142857142858,0.7785714285714286,0.7142857142857143,0.8357142857142857,0.8214285714285714,0.8357142857142857,0.7785714285714286,0.8428571428571429,0.7714285714285715,0.8,0.7285714285714285,0.7857142857142857,0.7214285714285714,0.7785714285714286,0.8071428571428572,0.7785714285714286,0.7642857142857142,0.7785714285714286,0.6785714285714286,0.7214285714285714,0.7571428571428571,0.7785714285714286,0.75,0.7857142857142857,0.8214285714285714,0.8428571428571429,0.8214285714285714,0.8285714285714286,0.8071428571428572,0.7357142857142858,0.7785714285714286,0.7714285714285715,0.7857142857142857,0.7071428571428572,0.7785714285714286,0.8214285714285714,0.8142857142857143,0.8,0.7714285714285715,0.6928571428571428,0.8,0.7642857142857142,0.7857142857142857,0.7142857142857143,0.8428571428571429,0.8071428571428572,0.8142857142857143,0.7928571428571428,0.8214285714285714,0.7571428571428571,0.8,0.6785714285714286,0.8071428571428572,0.6857142857142857,0.8071428571428572,0.7571428571428571,0.7857142857142857,0.75,0.7857142857142857,0.7285714285714285,0.7785714285714286,0.7428571428571429,0.7857142857142857,0.8,0.8142857142857143,0.8142857142857143,0.85,0.8357142857142857,0.8714285714285714,0.7642857142857142,0.7857142857142857,0.7571428571428571,0.7857142857142857,0.8357142857142857,0.7928571428571428,0.75,0.8071428571428572,0.7714285714285715,0.85,0.7714285714285715,0.7857142857142857,0.7571428571428571,0.7785714285714286,0.8357142857142857,0.8142857142857143,0.8214285714285714,0.8428571428571429,0.8071428571428572,0.8642857142857143,0.7928571428571428,0.7642857142857142,0.7714285714285715,0.7357142857142858,0.85,0.7857142857142857,0.7642857142857142,0.7785714285714286,0.7714285714285715,0.8214285714285714,0.7642857142857142,0.6285714285714286,0.8071428571428572,0.7714285714285715,0.8428571428571429,0.7857142857142857,0.8285714285714286,0.8214285714285714,0.8357142857142857,0.8642857142857143,0.8357142857142857,0.7428571428571429,0.8,0.7428571428571429,0.8357142857142857,0.7857142857142857,0.7928571428571428,0.8,0.8285714285714286,0.85,0.8285714285714286,0.7714285714285715,0.8,0.75,0.8,0.8142857142857143,0.8285714285714286,0.8071428571428572,0.85,0.7714285714285715,0.8714285714285714,0.7714285714285715,0.7928571428571428,0.7428571428571429,0.7642857142857142,0.8285714285714286,0.7928571428571428,0.7714285714285715,0.7928571428571428,0.7642857142857142,0.8571428571428571,0.7785714285714286,0.75,0.7857142857142857,0.7714285714285715,0.8142857142857143,0.7928571428571428,0.75,0.7642857142857142,0.7928571428571428,0.8142857142857143,0.8,0.75,0.7571428571428571,0.7857142857142857,0.8142857142857143,0.7928571428571428,0.7714285714285715,0.7357142857142858,0.7857142857142857,0.8071428571428572,0.8142857142857143,0.7642857142857142,0.7642857142857142,0.7928571428571428,0.8214285714285714,0.8,0.7785714285714286,0.7642857142857142,0.8071428571428572,0.8142857142857143,0.8,0.8071428571428572,0.7785714285714286,0.8,0.8214285714285714,0.8285714285714286,0.8285714285714286,0.7857142857142857,0.8071428571428572,0.8142857142857143,0.8928571428571429,0.8214285714285714,0.7928571428571428,0.8285714285714286,0.8428571428571429,0.8714285714285714,0.8285714285714286,0.7714285714285715,0.85,0.8,0.8785714285714286,0.8214285714285714,0.8,0.8285714285714286,0.8071428571428572,0.8642857142857143,0.8285714285714286,0.8214285714285714,0.85,0.8142857142857143,0.8785714285714286,0.8071428571428572,0.85,0.8285714285714286,0.8357142857142857,0.8642857142857143,0.8285714285714286,0.8428571428571429,0.8142857142857143,0.8571428571428571,0.8714285714285714,0.8714285714285714,0.8642857142857143,0.8142857142857143,0.8642857142857143,0.8785714285714286,0.8642857142857143,0.8285714285714286,0.8785714285714286,0.8071428571428572,0.8857142857142857,0.8214285714285714,0.7285714285714285,0.9857142857142858,0.8571428571428571,0.9714285714285714,0.7928571428571428,0.85,0.95,0.8285714285714286,0.95,0.8285714285714286,0.8785714285714286,0.9642857142857143,0.8357142857142857,0.9571428571428572,0.8428571428571429,0.8214285714285714,0.9571428571428572,0.8357142857142857,0.9285714285714286,0.8428571428571429,0.8785714285714286,0.9428571428571428,0.8642857142857143,0.9357142857142857,0.8642857142857143,0.8357142857142857,0.9642857142857143,0.8357142857142857,0.8428571428571429,0.9357142857142857,0.8857142857142857,0.95,0.8571428571428571,0.8642857142857143,0.9357142857142857,0.8428571428571429,0.9571428571428572,0.8428571428571429,0.8571428571428571,0.9642857142857143,0.8785714285714286,0.9571428571428572,0.85,0.8714285714285714,0.9428571428571428,0.8,0.9428571428571428,0.8642857142857143,0.8714285714285714,0.9428571428571428,0.8714285714285714,0.9428571428571428,0.9,0.8428571428571429,0.9642857142857143,0.8071428571428572,0.8785714285714286,0.9,0.8571428571428571,0.9428571428571428,0.8857142857142857,0.8714285714285714,0.9428571428571428,0.85,0.9714285714285714,0.7857142857142857,0.8428571428571429,0.95,0.8785714285714286,0.9642857142857143,0.8285714285714286,0.8785714285714286,0.9214285714285714,0.8642857142857143,0.9714285714285714,0.7857142857142857,0.8857142857142857,0.95,0.8928571428571429,0.9285714285714286,0.8642857142857143,0.8714285714285714,0.9571428571428572,0.8785714285714286,0.9428571428571428,0.8857142857142857,0.8142857142857143,0.9428571428571428,0.8428571428571429,0.8214285714285714,0.9428571428571428,0.8642857142857143,0.9642857142857143,0.8571428571428571,0.8928571428571429,0.9428571428571428,0.8571428571428571,0.9642857142857143,0.8785714285714286,0.8642857142857143,0.9571428571428572,0.8642857142857143,0.9642857142857143,0.8571428571428571,0.8714285714285714,0.95,0.7928571428571428,0.9642857142857143,0.85,0.8142857142857143,0.95,0.8642857142857143,0.9214285714285714,0.8857142857142857,0.8571428571428571,0.9571428571428572,0.8214285714285714,0.8785714285714286,0.9428571428571428,0.85,0.9642857142857143,0.85,0.8785714285714286,0.9285714285714286,0.85,0.9714285714285714,0.7857142857142857,0.8357142857142857,0.95,0.8785714285714286,0.9642857142857143,0.8214285714285714,0.8785714285714286,0.9642857142857143,0.85,0.9785714285714285,0.8142857142857143,0.8642857142857143,0.9571428571428572,0.8714285714285714,0.9428571428571428,0.85,0.8428571428571429,0.9428571428571428,0.8714285714285714,0.9214285714285714,0.8785714285714286,0.85,0.9642857142857143,0.8428571428571429,0.85,0.9571428571428572,0.8857142857142857,0.9428571428571428,0.8714285714285714,0.8714285714285714,0.9285714285714286,0.8571428571428571,0.95,0.8642857142857143,0.8785714285714286,0.95,0.8857142857142857,0.95,0.8357142857142857,0.8071428571428572,0.9357142857142857,0.8357142857142857,0.95,0.8357142857142857,0.7928571428571428,0.9428571428571428,0.8428571428571429,0.9285714285714286,0.8928571428571429,0.7928571428571428,0.95,0.8142857142857143,0.8857142857142857,0.9357142857142857,0.85,0.9357142857142857,0.8428571428571429,0.8714285714285714,0.9285714285714286,0.7357142857142858,0.9714285714285714,0.7857142857142857,0.8571428571428571,0.95,0.8142857142857143,0.9285714285714286,0.8428571428571429,0.85,0.95,0.7928571428571428,0.9571428571428572,0.7785714285714286,0.9214285714285714,0.9357142857142857,0.8571428571428571,0.9,0.8857142857142857,0.8642857142857143,0.9428571428571428,0.7928571428571428,0.9,0.8714285714285714,0.8928571428571429,0.9571428571428572,0.8642857142857143,0.8428571428571429,0.9285714285714286,0.8714285714285714,0.9642857142857143,0.8214285714285714,0.8285714285714286,0.9285714285714286,0.8214285714285714,0.95,0.8428571428571429,0.85,0.9357142857142857,0.8714285714285714,0.9571428571428572,0.8285714285714286,0.7928571428571428,0.9428571428571428,0.8357142857142857,0.95,0.8428571428571429,0.7928571428571428,0.9428571428571428,0.8285714285714286,0.9142857142857143,0.8928571428571429,0.8,0.9428571428571428,0.8357142857142857,0.8714285714285714,0.9285714285714286,0.85,0.95,0.8285714285714286,0.8785714285714286,0.9285714285714286,0.8,0.9714285714285714,0.8142857142857143,0.8785714285714286,0.9428571428571428,0.8285714285714286,0.9285714285714286,0.8214285714285714,0.8142857142857143,0.9571428571428572,0.7857142857142857,0.9642857142857143,0.7928571428571428,0.8571428571428571,0.95,0.8071428571428572,0.9,0.8642857142857143,0.8,0.9357142857142857,0.7785714285714286,0.8857142857142857,0.9,0.8214285714285714,0.9571428571428572,0.7857142857142857,0.7857142857142857,0.9571428571428572,0.7785714285714286,0.9428571428571428,0.7571428571428571,0.7928571428571428,0.9357142857142857,0.8214285714285714,0.9428571428571428,0.7785714285714286,0.7857142857142857,0.9571428571428572,0.7928571428571428,0.95,0.7785714285714286,0.8285714285714286,0.9428571428571428,0.8214285714285714,0.9071428571428571,0.8285714285714286,0.7571428571428571,0.95,0.7714285714285715,0.8357142857142857,0.8785714285714286,0.8071428571428572,0.9571428571428572,0.8071428571428572,0.7714285714285715,0.9571428571428572,0.75,0.9428571428571428,0.7642857142857142,0.6857142857142857,0.9428571428571428,0.7642857142857142,0.9785714285714285,0.7857142857142857,0.7928571428571428,0.9642857142857143,0.7571428571428571,0.9357142857142857,0.8,0.75,0.9571428571428572,0.75,0.8,0.6785714285714286,0.8428571428571429,0.7714285714285715,0.8,0.8071428571428572,0.8285714285714286,0.7928571428571428,0.9214285714285714,0.7642857142857142,0.8785714285714286,0.9071428571428571,0.8,0.9214285714285714,0.7357142857142858,0.5714285714285714,0.9642857142857143,0.6071428571428571,0.9,0.75,0.7857142857142857,0.95,0.8214285714285714,0.8928571428571429,0.7642857142857142,0.55,0.95,0.6642857142857143,0.8785714285714286,0.7857142857142857,0.8357142857142857,0.9571428571428572,0.8214285714285714,0.85,0.8357142857142857,0.5714285714285714,0.9214285714285714,0.7142857142857143,0.7571428571428571,0.8785714285714286,0.8142857142857143,0.9642857142857143,0.8071428571428572,0.65,0.9571428571428572,0.6928571428571428,0.9642857142857143,0.7428571428571429,0.7714285714285715,0.9357142857142857,0.7642857142857142,0.9785714285714285,0.7857142857142857,0.7357142857142858,0.9428571428571428,0.6642857142857143,0.95,0.7714285714285715,0.6071428571428571,0.9357142857142857,0.6785714285714286,0.95,0.8,0.7857142857142857,0.9214285714285714,0.7214285714285714,0.8785714285714286,0.8571428571428571,0.5714285714285714,0.9285714285714286,0.75,0.8928571428571429,0.9214285714285714,0.8071428571428572,0.9071428571428571,0.75,0.4642857142857143,0.95,0.75,0.9071428571428571,0.75,0.85,0.95,0.8142857142857143,0.9,0.8214285714285714,0.7642857142857142,0.9428571428571428,0.6642857142857143,0.95,0.7714285714285715,0.8428571428571429,0.95,0.8214285714285714,0.8571428571428571,0.8428571428571429,0.5714285714285714,0.9285714285714286,0.7,0.7428571428571429,0.8857142857142857,0.7357142857142858,0.9642857142857143,0.8142857142857143,0.6642857142857143,0.95,0.6357142857142857,0.9142857142857143,0.7357142857142858,0.5071428571428571,0.9571428571428572,0.7571428571428571,0.9857142857142858,0.7928571428571428,0.75,0.9428571428571428,0.6785714285714286,0.8714285714285714,0.7714285714285715,0.5357142857142857,0.9357142857142857,0.7642857142857142,0.9642857142857143,0.8142857142857143,0.8,0.9285714285714286,0.7,0.8928571428571429,0.8642857142857143,0.7928571428571428,0.9071428571428571,0.7714285714285715,0.85,0.9357142857142857,0.8,0.9214285714285714,0.7285714285714285,0.7142857142857143,0.9642857142857143,0.6214285714285714,0.8928571428571429,0.75,0.7857142857142857,0.9428571428571428,0.8142857142857143,0.8928571428571429,0.7642857142857142,0.6857142857142857,0.9642857142857143,0.6714285714285714,0.8714285714285714,0.7928571428571428,0.8357142857142857,0.95,0.8214285714285714,0.8428571428571429,0.8357142857142857,0.5928571428571429,0.9214285714285714,0.75,0.7571428571428571,0.9142857142857143,0.8071428571428572,0.9785714285714285,0.8071428571428572,0.6642857142857143,0.9571428571428572,0.6785714285714286,0.9642857142857143,0.7428571428571429,0.7642857142857142,0.9285714285714286,0.6428571428571429,0.8857142857142857,0.75,0.4714285714285714,0.95,0.6642857142857143,0.8642857142857143,0.7857142857142857,0.4857142857142857,0.9357142857142857,0.6928571428571428,0.8285714285714286,0.8,0.5357142857142857,0.9142857142857143,0.7214285714285714,0.7428571428571429,0.8857142857142857,0.5571428571428572,0.9214285714285714,0.7214285714285714,0.5142857142857142,0.95,0.5857142857142857,0.8928571428571429,0.7571428571428571,0.4142857142857143,0.95,0.6214285714285714,0.9,0.7428571428571429,0.4642857142857143,0.95,0.6357142857142857,0.8714285714285714,0.7785714285714286,0.4857142857142857,0.9357142857142857,0.6714285714285714,0.95,0.7857142857142857,0.5285714285714286,0.9285714285714286,0.7,0.7928571428571428,0.85,0.5642857142857143,0.9285714285714286,0.7071428571428572,0.6785714285714286,0.9071428571428571,0.5857142857142857,0.9,0.7357142857142858,0.40714285714285714,0.95,0.6285714285714286,0.9071428571428571,0.7357142857142858,0.44285714285714284,0.9571428571428572,0.6428571428571429,0.8785714285714286,0.7714285714285715,0.4714285714285714,0.9428571428571428,0.6714285714285714,0.8571428571428571,0.7785714285714286,0.5142857142857142,0.9285714285714286,0.7,0.8214285714285714,0.8285714285714286,0.5428571428571428,0.9285714285714286,0.7071428571428572,0.75,0.8785714285714286,0.5785714285714286,0.9,0.7428571428571429,0.4714285714285714,0.9571428571428572,0.5928571428571429,0.9142857142857143,0.7357142857142858,0.42857142857142855,0.9571428571428572,0.6214285714285714,0.8857142857142857,0.7642857142857142,0.45714285714285713,0.9428571428571428,0.65,0.8785714285714286,0.7571428571428571,0.5071428571428571,0.9428571428571428,0.6714285714285714,0.8428571428571429,0.8142857142857143,0.5285714285714286,0.9357142857142857,0.6928571428571428,0.7714285714285715,0.8642857142857143,0.5714285714285714,0.9142857142857143,0.7214285714285714,0.5928571428571429,0.9357142857142857,0.6,0.9142857142857143,0.7214285714285714,0.40714285714285714,0.9642857142857143,0.6142857142857143,0.8857142857142857,0.75,0.7642857142857142,0.9357142857142857,0.6571428571428571,0.8857142857142857,0.7571428571428571,0.4857142857142857,0.95,0.6714285714285714,0.8571428571428571,0.7928571428571428,0.5071428571428571,0.9357142857142857,0.6928571428571428,0.8071428571428572,0.8214285714285714,0.5428571428571428,0.9071428571428571,0.7285714285714285,0.7214285714285714,0.8857142857142857,0.5714285714285714,0.9214285714285714,0.7214285714285714,0.40714285714285714,0.9642857142857143,0.5928571428571429,0.8928571428571429,0.7642857142857142,0.4357142857142857,0.95,0.6285714285714286,0.9,0.7428571428571429,0.4714285714285714,0.8214285714285714,0.42857142857142855,0.2785714285714286,0.40714285714285714,0.8142857142857143,0.7928571428571428,0.4857142857142857,0.2857142857142857,0.2857142857142857,0.29285714285714287,0.3,0.3,0.3,0.3,0.29285714285714287,0.29285714285714287,0.2857142857142857,0.2785714285714286],
    height: 200,
    width: 800,
    lines: 100
})

o.init()