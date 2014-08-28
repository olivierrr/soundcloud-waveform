soundcloud-waveform
===================

## usage

```js
var foo = new Waveformer()
foo.init(options)
```

options are:
* `waveform` array of floats
* `gutterWidth` pixels between waves
* `waveWidth` wave width in pixels
* `width` waveform width in pixels
* `height` waveform height in pixels
* `container` dom node where waveform will be appended
* `reflection` 0-50% where 0.34 = 34%


## events

### `ready(waveformer)`
waveformer has initialized

### `pause(waveformer, currentTrackTime)`
when track is paused

### `play(waveformer, currentTrackTime)`
when track is played

### `finished(waveformer)`
when track finishes playing

### `hover(waveformer, mousePosTrackTime, waveClicked)` //todo
on mouse hover

### `click(waveformer, mousePosTrackTime, waveClicked)` //todo
on mouse click

## API

### controls

### `play()`
play track

### `pause()`
pause track

### `skipTo(seconds)`
skip to any point

###update
updates are instantly applied and rendered
### `update(options)`
`options.gutterWidth`
`options.waveWidth`
`options.width`
`options.height`
`options.reflection`


###colors
colors are instantly applied and rendered

### `setColor(name, color)`
set color

### `setGradient(name, [colors])`
set gradient

## license

MIT