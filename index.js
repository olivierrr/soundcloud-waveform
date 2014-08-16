var WAVEFORM = function(options) {

	this.canvas = document.createElement('canvas')

	this.container = options.container
	this.height = options.height || 100
	this.width = options.width || 300
	this.waveform = options.waveform 

	this.gutter = options.gutter || 1
	this.barWidth = options.barWidth || 3

}

WAVEFORM.prototype.init = function() {

	console.log('init')
	
	this.canvas.width = this.width
	this.canvas.height = this.height

	// get canvas context
	this.ctx = this.canvas.getContext('2d')

	// append canvas
	this.container.appendChild(this.canvas)

	//render
	this.draw()

}

WAVEFORM.prototype.update = function(options) {

	console.log('update')

	if(options) {

		if(options.gutter) {
			this.gutter = options.gutter
			this.genWaves()
		}

		if(options.barWidth) {
			this.barWidth = options.barWidth
			this.genWaves()
		}

		if(options.gradient) console.log('awdwd')

		if(options.width) {
			this.width = options.width
			this.canvas.width = this.width
			this.genWaves()
		}

		if(options.height) {
			this.height = options.height
			this.canvas.height = this.height
			this.genWaves()
		}

	}

	//render
	this.draw()
}

WAVEFORM.prototype.draw = function() {

	console.log('draw')

	var waves = this.waves || this.genWaves()

	var xPos = 0
	var yPos = 100

	//should be on init // should be updatedable
	gradient = this.ctx.createLinearGradient(0,100,0,0)
	gradient.addColorStop(0, '#373737')
	gradient.addColorStop(1, '#BDBDBD')

	//clear canvas for redraw
	this.ctx.clearRect ( 0 , 0 , this.width , this.height );
	
	for(var i=0; i<waves.length; i+=1) {

		// main bar
		this.ctx.fillStyle = '#333333'
		this.ctx.fillRect(xPos, yPos, this.barWidth, Math.floor(-Math.abs(waves[i]*100)))

		// gutter
		this.ctx.fillStyle = gradient
		var smaller = Math.min(waves[i],waves[i+1])
		this.ctx.fillRect(xPos + this.barWidth, yPos, this.gutter, Math.floor(-Math.abs(smaller*100)))
		
		// bar reflection
		this.ctx.fillStyle = '#B3B3B3'		
		this.ctx.fillRect(xPos, yPos, this.barWidth, Math.floor(waves[i]*30))

		xPos += this.barWidth + this.gutter
	}

}

WAVEFORM.prototype.genWaves = function() {

	console.log('genWaves')

	var result, waves, wave, i

	var lines = (this.width / (this.gutter + this.barWidth) )

	//var lines = (this.width - )

	result = Math.round(this.waveform.length / lines)

	waves = []
	wave = 0

	for(i=0; i<this.waveform.length; i+=1) {

		wave += this.waveform[i]

		if(i%result === 0 && i !== 0) {
			waves.push(wave/result)
			wave = 0

		}

	}
	return this.waves = waves
}

var example = require('./example')(WAVEFORM)