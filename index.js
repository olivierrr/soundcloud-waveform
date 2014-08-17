var WAVEFORM = function(options) {

	this.container = options.container
	this.height = options.height || 100
	this.width = options.width || 300
	this.waveform = options.waveform
	this.reflection = options.reflection || 0

	this.colors = {}

	this.gutter = options.gutter || 1
	this.barWidth = options.barWidth || 3

	// unique ID
	this.id = Math.floor((Math.random() * 10000) + 1);

	// canvas node
	this.canvas = document.createElement('canvas')

	// active = highlighted secion of track
	this.active = -1

	// slected = dimmer highlighted slections
	this.selected = -1

	// mouse dragging
	this.isDragging = false

	// 0 = out of focus // 1 = onfocus and playing // 2 = onfocus and paused
	this.state = 0

}

WAVEFORM.prototype.init = function() {

	console.log(this.id + ' init')

	// set ID
	this.canvas.setAttribute('data-w', this.id)
	
	// set canvas height and width
	this.canvas.width = this.width
	this.canvas.height = this.height

	// get canvas context
	this.ctx = this.canvas.getContext('2d')

	// append canvas
	this.container.appendChild(this.canvas)

	//default colors
	this.color('bar', ['#666666', 0, '#868686', 1])
	this.color('bar-active', ['#FF3300', 0, '#FF5100', 1])
	this.color('bar-selected', ['#993016', 0, '#973C15', 1])
	this.color('gutter', ['#6B6B6B', 0, '#c9c9c9', 1])
	this.color('gutter-active', ['#FF3704', 0, '#FF8F63', 1])
	this.color('gutter-selected', ['#9A371E', 0, '#CE9E8A', 1])

	//bind event handlers
	this.bindEventHandlers()

	//parse waveform
	this.cache()

	//render
	this.draw()

}

WAVEFORM.prototype.destroy = function() {
	//todo
}

WAVEFORM.prototype.bindEventHandlers = function() {

	this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
	this.canvas.addEventListener('mousemove', this.onMouseOver.bind(this))
	this.canvas.addEventListener('mouseout', this.onMouseOut.bind(this))
	this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
}

WAVEFORM.prototype.onMouseOut = function(e) {
	this.selected = -1
	this.draw()
}

WAVEFORM.prototype.onMouseUp = function(e) {
	this.isDragging = false
}

WAVEFORM.prototype.onMouseOver = function(e) {

	var x = e.x - this.canvas.offsetLeft
	var y = e.y - this.canvas.offsetTop

	// it's a bit off
	var barClicked = Math.round( x / (this.barWidth + this.gutter) ) - ( (this.barWidth + this.gutter) / 2.5 )

	if(this.isDragging === true) {
		this.selected = -1
		this.active = barClicked
	} 

	else {
		this.selected = barClicked
	}

	this.draw()

}

WAVEFORM.prototype.onMouseDown = function(e) {

	this.isDragging = true

	var x = e.x - this.canvas.offsetLeft
	var y = e.y - this.canvas.offsetTop

	// it's a bit off
	var barClicked = Math.round( x / (this.barWidth + this.gutter) ) - ( (this.barWidth + this.gutter) / 2.5 )

	this.active = barClicked

	this.draw()
}

WAVEFORM.prototype.update = function(options) {

	console.log(this.id + ' update')

	if(options) {

		if(options.gutter) {
			this.gutter = options.gutter
		}

		if(options.barWidth) {
			this.barWidth = options.barWidth
		}

		if(options.width) {
			this.width = options.width
			this.canvas.width = this.width
		}

		if(options.height) {
			this.height = options.height
			this.canvas.height = this.height
		}

		if(options.reflection == 0 || options.reflection) {
			this.reflection = options.reflection
		}

	}

	if(options.gutter || options.barWidth || options.width || options.height) this.cache()

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
}

WAVEFORM.prototype.draw = function() {

	console.log(this.id + ' draw')

	var smallerBar, xPos, yPos

	xPos = 0
	yPos = 100

	// clear canvas for redraw
	this.ctx.clearRect ( 0 , 0 , this.width , this.height );
	
	// itterate waves
	for(var i=0; i<this.waves.length; i+=1) {

		// main bar
		this.ctx.fillStyle = this.colors['bar']
		if(this.active > i) this.ctx.fillStyle = this.colors['bar-active']

		if(this.selected > 0 && (this.selected < i && i < this.active) || (this.selected > i && i > this.active)) {
			this.ctx.fillStyle = this.colors['bar-selected']
		}
		this.ctx.fillRect(xPos, yPos, this.barWidth, this.waves[i])


		// gutter
		this.ctx.fillStyle = this.colors['gutter']
		if(this.active > i) this.ctx.fillStyle = this.colors['gutter-active']

		if(this.selected > 0 && (this.selected < i && i < this.active) || (this.selected > i && i > this.active)) {
			this.ctx.fillStyle = this.colors['gutter-selected']
		}
		smallerBar = Math.max(this.waves[i],this.waves[i+1])
		this.ctx.fillRect(xPos + this.barWidth, yPos, this.gutter, smallerBar)


		// bar reflection
		if(this.reflection > 0) {
			this.ctx.fillStyle = '#999999'
			this.ctx.fillRect(xPos, yPos, this.barWidth, Math.abs(this.waves[i]) * this.reflection)
		}


		xPos += this.barWidth + this.gutter
	}

}

// parse and cache array of points
WAVEFORM.prototype.cache = function() {

	console.log(this.id + ' cache')

	var result, waves, wave, i

	var lines = (this.width / (this.gutter + this.barWidth) )

	result = Math.round(this.waveform.length / lines)

	waves = []
	wave = 0

	for(i=0; i<this.waveform.length; i+=1) {

		wave += this.waveform[i]

		if(i%result === 0 && i !== 0) {

			wave = (wave/result)
			wave = Math.floor(-Math.abs(wave*100))

			waves.push(wave)

			wave = 0

		}

	}
	return this.waves = waves
}

var example = require('./example')(WAVEFORM)