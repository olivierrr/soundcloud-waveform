soundcloud-waveform
===================

## usage

![alt tag](http://i.imgur.com/FzZjzFT.png)

```js
var foo = new Waveformer()
foo.init({
    waveformer: [ /* array of floats */ ],
    height: 200,
    width: 800,
    reflection: 0.3,
    waveWidth: 2,
    gutterWidth: 1,
    container: document.body,
    trackLength: 420
})
```

options are:
* `waveform` array of floats
* `height` waveform height in pixels
* `width` waveform width in pixels
* `reflection` 0-50% where 0.34 = 34%
* `waveWidth` wave width in pixels
* `gutterWidth` pixels between waves
* `container` dom node where waveform will be appended
* `trackLength` track length in seconds

## events

### `ready(waveformer)`
waveformer has initialized

### `pause(waveformer, currentTrackTime)`
when track is paused

### `play(waveformer, currentTrackTime)`
when track is played

### `finished(waveformer)`
when track finishes playing

### `hover(waveformer, mousePosTrackTime, waveClicked)`
on mouse hover

### `click(waveformer, mousePosTrackTime, waveClicked)`
on mouse click

### `skip(waveformer, newTime)`
when user skips to a new time

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