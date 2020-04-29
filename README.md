# Platforms.js
Platforms.js is a quick and easy way to make great JS platformers. Here's how to get started:
1. **Get the file.** Download platforms.js and put it in your project folder.
2. **Link it up.** Link the platforms.js in your HTML file. 
`<script type="text/javascript" src="platformer.js"></script>`
3. **Start coding.** Continue reading to find out how!
________________________________________________________________________________________________________
Using platforms.js is simple and easy. First, look at this starter code:
``` javascript
// get our canvas context for drawing.
var canvas = document.getElementById('canvas').getContext('2d');
// initialize game
var game = new Game({maxVelocity:10, moveSpeed:3, jumpSpeed:10});
// create a new level
var level1 = new Level(200, 0);
// create a platform and add it; add the level to the game
var groundPlatform = new Platform(0, 475, 500, 25);
level1.add(groundPlatform);
game.add(level1);
// game loop
function gameLoop(){
// if pressing left or right, go left or right. if pressing up, tell the game to jump (won't jump if in midair for example)
  if (keysPressed[37]){
		game.x -= game.speed;
	}
	if (keysPressed[39]){
		game.x += game.speed;
	}
	if (keysPressed[38]){
		game.jump();
	}
// do collisions, render the game onto our canvas, and reset for the next game loop.
  game.doCollisions(game.x, game.y);
  game.render(canvas);
  game.reset();
};
setInterval(gameLoop, 10);
```
