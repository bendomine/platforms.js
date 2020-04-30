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
What is this all doing? let's go through it step by step. Firstly, there's the `Game` class. This handles almost everything. When defining a game, use an object as a parameter with these values:
* `maxVelocity`: The maximum speed your character can fall at.
* `moveSpeed`: The left and right movement speed of your character.
* `jumpSpeed`: How high your character can jump.

Next, there's the `Level` class. Define a level with two parameters- the x and y spawnpoints of the character. The character will start there at the beginning of the level and will come back there every time it dies.

Finally, we have the `Platform` class. A platform is initialized like so:
``` javascript
var examplePlatform = new Platform(x1, y1, x2, y1, type);
```
The parameters and what they mean:
* x1: The x position of the top left corner of your platform.
* y1: The y position of the top left corner of your platform.
* x2: How far along your platform extends in the x direction.
* y2: How far your platform extends in the y direction.
* type: Type is optional. It is a string that tells what type of platform your platform is. The default is `"platform"`, which is just a normal platform. The other two are `"lava"` and `"finish"`. Lava turns your platform red and makes it deadly to the character, and finish turns it green and, when the character touches it, goes to the next level.

Finally, use `level.add(platform);` to add your platform to the level, and `game.add(level);` to add the level to the game.

**Note:** Levels will be added to the game in the order you use `game.add(level);` in. So using the following code:
``` javascript
var level1 = new Level(0, 0);
// create platforms and add them
var level2 = new Level(50, 50);
// create more platforms and add them
game.add(level1);
game.add(level2);
```
When the code is run, the character will start in `level1` and when they touch a `finish` platform, they go to `level2`.

So now you know enough to make a basic platformer! Just a few things before you get started:
* Using JS's coordinate system, y values get bigger as they go down. This means that increasing the `yVelocity` (more about this later on) will make the character go down faster, and decreasing it will make it go up.
* This also means that decreasing the y value makes the character go up.

Continue reading for the documentation.


## Table of Contents
1. [`Game`](./#platforms.js)
