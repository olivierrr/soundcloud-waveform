var WAVEFORM = function(options) {

	this.container = options.container
	this.height = options.height || 100
	this.width = options.width || 300
	this.waveform = options.waveform
	this.reflection = options.reflection || 0

	this.colors = {}

	this.gutter = options.gutter || 1
	this.waveWidth = options.waveWidth || 3

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

	// is playing
	this.isPlaying = false

	// is in focus
	this.isFocus = false

}

WAVEFORM.prototype.init = function() {

	//console.log(this.id + ' init')

	// set ID
	this.canvas.setAttribute('data-waveform-id', this.id)
	
	// set canvas height and width
	this.canvas.width = this.width
	this.canvas.height = this.height

	// get canvas context
	this.ctx = this.canvas.getContext('2d')

	// append canvas
	this.container.appendChild(this.canvas)

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

	var waveClicked = Math.round( x / (this.waveWidth + this.gutter) )

	if(this.isDragging === true) {
		this.selected = -1
		this.active = waveClicked
	} 

	else {
		this.selected = waveClicked
	}

	this.draw()

}

WAVEFORM.prototype.onMouseDown = function(e) {



	this.isDragging = true

	var x = e.x - this.canvas.offsetLeft
	var y = e.y - this.canvas.offsetTop

	var waveClicked = Math.round( x / (this.waveWidth + this.gutter) )

	this.active = waveClicked

	this.draw()
}

WAVEFORM.prototype.update = function(options) {

	//console.log(this.id + ' update')

	if(options) {

		if(options.gutter) {
			this.gutter = options.gutter
		}

		if(options.waveWidth) {
			this.waveWidth = options.waveWidth
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

		if(options.gutter || options.waveWidth || options.width || options.height || (options.reflection || options.reflection === 0)) {
			this.cache()
		}
	}

	//render
	this.draw()
}

// 'experimental'
WAVEFORM.prototype.color = function(name, colors) {

	var gradient = this.ctx.createLinearGradient(0,this.waveOffset,0,0)

	for(var i=0; i<colors.length; i+=2) {
		gradient.addColorStop(colors[i+1], colors[i])
	}

	this.colors[name] = gradient
}

WAVEFORM.prototype.addColors = function() {

	//default colors

	this.color('wave-focus', ['#333333', 0, '#333333', 1])
	this.color('wave', ['#666666', 0, '#868686', 1])
	this.color('wave-active', ['#FF3300', 0, '#FF5100', 1])
	this.color('wave-selected', ['#993016', 0, '#973C15', 1])

	this.color('gutter', ['#6B6B6B', 0, '#c9c9c9', 1])
	this.color('gutter-active', ['#FF3704', 0, '#FF8F63', 1])
	this.color('gutter-selected', ['#9A371E', 0, '#CE9E8A', 1])

	this.color('reflection', ['#999999', 0, '#999999', 1])
	this.color('reflection-active', ['#FFC0A0', 0, '#FFC0A0', 1])
}

WAVEFORM.prototype.draw = function() {

	//console.log(this.id + ' draw')

	var gutter, xPos, yPos

	xPos = 0
	yPos = this.waveOffset



	// clear canvas for redraw
	this.ctx.clearRect ( 0 , 0 , this.width , this.height );
	
	// itterate waves 
	for(var i=0; i<this.waves.length; i+=1) {

		// wave
		this.ctx.fillStyle = this.colors['wave-focus']
		if(this.active > i) this.ctx.fillStyle = this.colors['wave-active']

		if(this.selected > 0 && (this.selected < i && i < this.active) || (this.selected > i && i >= this.active)) {
			this.ctx.fillStyle = this.colors['wave-selected']
		}
		// draw wave
		this.ctx.fillRect(xPos, yPos, this.waveWidth, this.waves[i])


		// gutter
		this.ctx.fillStyle = this.colors['gutter']
		if(this.active > i) this.ctx.fillStyle = this.colors['gutter-active']

		if(this.selected > 0 && (this.selected < i && i < this.active) || (this.selected > i && i >= this.active)) {
			this.ctx.fillStyle = this.colors['gutter-selected']
		}
		gutter = Math.max(this.waves[i],this.waves[i+1])
		// draw gutter
		this.ctx.fillRect(xPos + this.waveWidth, yPos, this.gutter, gutter)


		// reflection wave
		if(this.reflection > 0) {

			var reflectionHeight =  (Math.abs(this.waves[i]) / (1 - this.reflection) ) * this.reflection

			if(this.active > i) this.ctx.fillStyle = this.colors['reflection-active']
			else this.ctx.fillStyle = this.colors['reflection']

			// draw reflection
			this.ctx.fillRect(xPos, yPos, this.waveWidth, reflectionHeight)
		}


		xPos += this.waveWidth + this.gutter
	}
}

//TODO refactor
// parse and cache array of points
WAVEFORM.prototype.cache = function() {

	var result, waves, wave, i, lines

	this.waveOffset = Math.floor( this.height  - (this.height * this.reflection) )

	this.reflectionHeight = Math.floor( this.height - this.waveOffset )

	this.waveHeight = Math.floor( this.height - this.reflectionHeight )

	this.addColors()

	// console.log('waveOffset: ' + this.waveOffset )
	// console.log(' waveHeight: ' + this.waveHeight + ' reflectionHeight: ' + this.reflectionHeight + '  = ' + (this.waveHeight + this.reflectionHeight) )

	lines = (this.width / (this.gutter + this.waveWidth) )

	result = Math.round(this.waveform.length / lines)

	waves = []
	wave = 0

	for(i=0; i<this.waveform.length; i+=1) {

		wave += this.waveform[i]

		if(i%result === 0 && i !== 0) {

			wave = (wave/result)
			wave = Math.floor(-Math.abs(wave * this.waveHeight))

			waves.push(wave)

			wave = 0

		}
	}
	return this.waves = waves
}

var example = require('./example')(WAVEFORM)