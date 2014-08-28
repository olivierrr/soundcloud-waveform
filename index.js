window.requestAnimFrame = (function(){
  	return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
          window.setTimeout(callback, 1000/30);
        }
})()

var WAVEFORM = function(options) {

	if(!options.container) {
		throw new Error('waveform needs a container')
	}

	this.container = options.container
	this.height = options.height || 100
	this.width = options.width || 300
	this.waveform = options.waveform
	this.reflection = options.reflection || 0

	// length of track in seconds
	this.trackLength = options.trackLength*1000 || 1*100

	this.colors = {}

	this.gutterWidth = options.gutterWidth || 1
	this.waveWidth = options.waveWidth || 3

	// unique ID
	this.id = Math.random()

	// canvas node
	this.canvas = document.createElement('canvas')

	// active = highlighted section of track
	this.active = -1

	// slected = dimmer highlighted slections
	this.selected = -1

	// mouse dragging
	this.isDragging = false

	// is playing
	this.isPlaying = false

	// is in focus
	this.isFocus = false

	this.secondsPlayed = 0

	// holds events
	this.events = {}

}

WAVEFORM.prototype.on = function(name, callback) {

	if(!name || !callback) return

	this.events[name] ?
		this.events[name].e.push(callback) :
		this.events[name] = { e:[callback] }
}

WAVEFORM.prototype.fireEvent = function(name) {

	if(!this.events[name]) return

	var args = [].splice.call(arguments, 0)
	args[0] = this

	this.events[name].e.forEach(function(event) {
		event.apply(null, args)
	})
}

WAVEFORM.prototype.init = function() {

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

	//calc height
	this.updateHeight()

	//parse waveform
	this.cache()

	//render
	this.render()

	this.fireEvent('ready')
}

WAVEFORM.prototype.play = function() {

	clearInterval(this.playInterval)

	this.isPlaying = true

	this.fireEvent('play', this.secondsPlayed)

	// time that each wave takes to become 'active'
	this.AnimTime = ( this.trackLength / this.waves.length )

	function foo(){

		this.secondsPlayed += this.AnimTime

		if(this.active >= this.waves.length) {
			this.fireEvent('finish')
			this.pause()
		}

		this.clickPercent += (this.width/this.waves.length)/1000
		this.active += 1

		this.render()
	}

	this.playInterval = setInterval(foo.bind(this), this.AnimTime)
}

WAVEFORM.prototype.pause = function() {

	this.fireEvent('pause', this.secondsPlayed)

	this.isPlaying = false
	
	clearInterval(this.playInterval)
}

WAVEFORM.prototype.skipTo = function() {
	//todo	
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

	this.render()
}

WAVEFORM.prototype.onMouseUp = function(e) {

	this.isDragging = false
}

WAVEFORM.prototype.onMouseOver = function(e) {

	var x = e.x - this.canvas.offsetLeft - this.paddingLeft

	var waveClicked = Math.round( x / (this.waveWidth + this.gutterWidth) )

	if(this.isDragging === true) {
		this.selected = -1
		this.clickPercent = x / this.width
		this.active = this.calcPercent()
	}

	else {
		this.selected = waveClicked
	}

	this.render()

}

WAVEFORM.prototype.calcPercent = function() {

	return  Math.round(( this.clickPercent * this.width ) / ( this.waveWidth + this.gutterWidth ))
}

WAVEFORM.prototype.onMouseDown = function(e) {

	this.isDragging = true

	var x = e.x - this.canvas.offsetLeft - this.paddingLeft

	this.clickPercent = x / this.width

	this.active = this.calcPercent()

	this.render()
}

WAVEFORM.prototype.update = function(options) {

	if(options) {

		if(options.gutterWidth) {
			this.gutterWidth = options.gutterWidth
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

		// if 1 or more of these is actived, recalc and cache
		if(options.gutterWidth || options.waveWidth || options.width || options.height || (options.reflection || options.reflection === 0)) {
			this.cache()
		}

		if(options.height || (options.reflection || options.reflection === 0)) {
			this.updateHeight()
		}
	}

	//render
	this.render()
}

// 'experimental'
WAVEFORM.prototype.setGradient = function(name, colors) {

	var gradient = this.ctx.createLinearGradient(0,this.waveOffset,0,0)
	for(var i=0; i<colors.length; i+=2) {
		gradient.addColorStop(colors[i+1], colors[i])
	}

	this.colors[name] = gradient
}

WAVEFORM.prototype.setColor = function(name, color) {
	
	this.colors[name] = color
}

WAVEFORM.prototype.addColors = function() {
	this.setColor('wave-focus', '#333333')
	this.setGradient('wave', ['#666666', 0, '#868686', 1])
	this.setGradient('wave-active', ['#FF3300', 0, '#FF5100', 1])
	this.setGradient('wave-selected', ['#993016', 0, '#973C15', 1])
	this.setGradient('gutter', ['#6B6B6B', 0, '#c9c9c9', 1])
	this.setGradient('gutter-active', ['#FF3704', 0, '#FF8F63', 1])
	this.setGradient('gutter-selected', ['#9A371E', 0, '#CE9E8A', 1])
	this.setColor('reflection', '#999999')
	this.setColor('reflection-active', '#FFC0A0')
}

WAVEFORM.prototype.render = function() {
	requestAnimationFrame(this.draw.bind(this))
}

WAVEFORM.prototype.draw = function() {

	var gutter, xPos, yPos

	xPos = this.paddingLeft
	yPos = this.waveOffset

	// clear canvas for redraw
	this.ctx.clearRect ( 0 , 0 , this.width , this.height );

	// itterate waves
	for(var i=0; i<this.waves.length; i+=1) {

		// wave

		// if is hovered
		if(this.selected > 0 && (this.selected <= i && i < this.active) || (this.selected > i && i >= this.active)) {
			this.ctx.fillStyle = this.colors['wave-selected']
		}
		// if is active
		else if(this.active > i) {
			this.ctx.fillStyle = this.colors['wave-active']
		}
		// default
		else {
			this.ctx.fillStyle = this.colors['wave-focus']
		}

		// draw wave
		this.ctx.fillRect(xPos, yPos, this.waveWidth, this.waves[i])


		// gutter

		// if is hovered
		if(this.selected > 0 && (this.selected <= i && i < this.active) || (this.selected > i && i >= this.active)) {
			this.ctx.fillStyle = this.colors['gutter-selected']
		}
		// if is active
		else if(this.active > i) {
			this.ctx.fillStyle = this.colors['gutter-active']
		}
		// default
		else {
			this.ctx.fillStyle = this.colors['gutter']
		}

		// smallest wave between butter is gutters height
		// note: Math.max because wave values are negative
		gutterX = Math.max(this.waves[i],this.waves[i+1])

		// draw gutter
		this.ctx.fillRect(xPos + this.waveWidth, yPos, this.gutterWidth, gutterX)


		// reflection wave
		if(this.reflection > 0) {

			var reflectionHeight =  (Math.abs(this.waves[i]) / (1 - this.reflection) ) * this.reflection

			if(this.active > i) this.ctx.fillStyle = this.colors['reflection-active']
			else this.ctx.fillStyle = this.colors['reflection']

			// draw reflection
			this.ctx.fillRect(xPos, yPos, this.waveWidth, reflectionHeight)
		}


		xPos += this.waveWidth + this.gutterWidth
	}
}

WAVEFORM.prototype.updateHeight = function(first_argument) {

	this.waveOffset = Math.round( this.height  - (this.height * this.reflection) )

	this.reflectionHeight = Math.round( this.height - this.waveOffset )

	this.waveHeight = this.height - this.reflectionHeight

	this.addColors()
}

//TODO refactor
// parse and cache array of points
WAVEFORM.prototype.cache = function() {

	var wavesPerWave, waves, wave, i, waveCount

	waveCount = this.width / (this.gutterWidth + this.waveWidth)

	wavesPerWave = Math.ceil(this.waveform.length / waveCount)

	waves = []
	
	wave = 0

	for(i=0; i<this.waveform.length; i+=1) {

		wave += this.waveform[i]

		if(i%wavesPerWave === 0 && i !== 0) {

			wave = (wave/wavesPerWave)
			wave = Math.floor(-Math.abs(wave * this.waveHeight))

			waves.push(wave)

			wave = 0
		}
	}

	// this shouldn't be here!
	this.active = this.calcPercent()

	this.paddingLeft = Math.floor((this.width - ((this.gutterWidth + this.waveWidth)*waves.length))/2)
	this.paddingRight = Math.ceil((this.width - ((this.gutterWidth + this.waveWidth)*waves.length))/2)

	if(this.isPlaying) this.play()

	return this.waves = waves
}

var example = require('./example')(WAVEFORM)
