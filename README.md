# Factors Game

The 🐐 of fun math games, twisting the very rules of math and increasingly challenging your skills

### Screenshot

![Screenshot of level 2 of Factors Game](/etc/screenshots/level-2-night-rainbow-screenshot.png?raw=true "Level 2")

## The Concept

### The Goal
Move your number down through the number board to get as close to 1 as possible.

### The Rules
 * If your number encounters a factor, it will be divided by that factor.
 * All other numbers will add to your number.

### The Caveat

The levels are procedurally generated, so you may not be able to get to 1 on some levels. However, these levels further challenge you to find the best solution: the lowest number with the least amount of moves. Your overarching goal is to keep your average as low as possible.

### Basic Initialization

Get your canvas and go!

```javascript
var canvas = document.getElementById('myCanvas');
FactorsGame.init(canvas).start();
```

### Author

Michael P. Nitowski <[mpnitowski@gmail.com](mailto:mpnitowski@gmail.com)>
    (Twitter: [@mikenitowski](https://twitter.com/mikenitowski),
     Web: [mnito.co](http://mnito.co))

### License

Factors Game is licensed under the [MIT license](/LICENSE "License of Factors Game").
