var WAVEFORM = function(options) {

	this.canvas = document.createElement('canvas')

	this.container = options.container
	this.height = options.height || 100
	this.width = options.width || 300
	this.waveform = options.waveform

	this.colors = {}

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

	this.color('gutter', ['#6B6B6B', 0, '#c9c9c9', 1])
	this.color('bar', ['#666666', 0, '#868686', 1])

	//render
	this.draw()

}
////bar-bottom #666666  //bar-top #868686 //gutter-bottom #6B6B6B //gutter-top #909090
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

// 'experimental'
WAVEFORM.prototype.color = function(name, colors) {

	var gradient = this.ctx.createLinearGradient(0,100,0,0)

	for(var i=0; i<colors.length; i+=2) {
		gradient.addColorStop(colors[i+1], colors[i])
	}

	this.colors[name] = gradient

	this.draw()
};

WAVEFORM.prototype.draw = function() {

	console.log('draw')

	var waves = this.waves || this.genWaves()

	var xPos = 0
	var yPos = 100

	//clear canvas for redraw
	this.ctx.clearRect ( 0 , 0 , this.width , this.height );
	
	for(var i=0; i<waves.length; i+=1) {

		// main bar
		this.ctx.fillStyle = this.colors['bar']
		this.ctx.fillRect(xPos, yPos, this.barWidth, Math.floor(-Math.abs(waves[i]*100)))

		// gutter
		this.ctx.fillStyle = this.colors['gutter']
		var smaller = Math.min(waves[i],waves[i+1])
		this.ctx.fillRect(xPos + this.barWidth, yPos, this.gutter, Math.floor(-Math.abs(smaller*100)))
		
		// bar reflection
		this.ctx.fillStyle = '#B3B3B3'		
		this.ctx.fillRect(xPos, yPos, this.barWidth, Math.floor(waves[i]*30))

		xPos += this.barWidth + this.gutter
	}

}


// need more accurate algo
WAVEFORM.prototype.genWaves = function() {

	console.log('genWaves')

	var result, waves, wave, i

	var lines = (this.width / (this.gutter + this.barWidth) )

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