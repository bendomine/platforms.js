# Platforms.js
Platforms.js is a quick and easy way to make great JS platformers. Here's how to get started:
1. **Get the file.** Download platforms.js and put it in your project folder.
2. **Link it up.** Link the platforms.js in your HTML file. 
`<script type="text/javascript" src="platformer.js"></script>`
3. **Start coding.** Continue reading to find out how!
________________________________________________________________________________________________________
Using platforms.js is simple and easy. First, look at this starter code:
``` javascript
// get our canvas for rendering.
var canvas = document.getElementById('canvas');
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


## Documentation
### I know it's small but it will get bigger!

### `Game`: Main class that has most of the properties in it.
#### Parameters:
1. `config (object)`
`config`: `{maxVelocity:<double or int>, moveSpeed: <double or int>, jumpSpeed: <double or int>}`

**Example**: `var game = new Game({maxVelocity: 10, moveSpeed: 3, jumpSpeed: 10.3});`
#### Properties:
* `levels ([])`: An array of all levels in the game. Each object in the array is a `Level`.
* `currentLevel (int)`: The current level being played from `Game.levels`. So if level one is being played, you can access it with `Game.levels[Game.currentLevel];`.
* `x (double)`: The X position of the character.
* `y (double)`: The Y position of the character.
* `yVelocity (double)`: The current Y velocity of the character. A negative Y velocity indicates that the character is going up.
* `jumping (bool)`: Is `true` if the player is jumping.
* `speed (int or double)`: The X speed of the character. The higher it is, the faster the character will move when the side keys are pressed. Is set from the config parameter used when initializing `Game`, so can be set to an int or double.
* `jumpSpeed (int or double)`: How high and fast the character will jump when the up key is pressed. Is set from the config parameter used when initializing `Game`, so can be set to an int or double.
* `maxVelocity (int or double)`: Maximum possible speed the character can fall. Is set from the config parameter used when initializing `Game`, so can be set to an int or double.

#### Methods:
* `add(Level)`: Adds the given `Level` to the `Game`. Can later be referenced in `Game.levels`.
* `jump()`: Attempts to jump. If this is impossible (for example the character is in midair), it will not jump.
* `reset()`: Resets the physics engine. Use this at the very end of every game loop.
* `kill()`: Kills the character and respawns them at the current level's respawn X and Y.
* `doCollisions(x (double), y (double))`: Does collisions and runs the physics engine at the given X and Y positions. Generally, the function would be run like this: `Game.doCollisions(Game.x, Game.y);`. **Run this every loop or your physics will not work properly.**
* `render(HTML Canvas Object)`: Renders the platformer onto the given canvas element from the DOM.


### `Level`: A class for each level in the game.
#### Parameters:
1. `x (double or int)`: The X position where ther character should spawn in when entering the level and respawn after dying.
2. `y (double or int)`: The Y position where ther character should spawn in when entering the level and respawn after dying.

**Example**: `var firstLevel = new Level(40, 600.2);`
#### Properties:
* `platforms ([])`: An array of all of the platforms in this level. Each object in the array is a `Platform`.
* `respawnX (double or int)`: The X position where ther character should spawn in when entering the level and respawn after dying.
* `respawnY (double or int)`: The Y position where ther character should spawn in when entering the level and respawn after dying.

#### Methods:
* `add(Platform)`: Adds the given `Platform` to the level. Can later be referenced in `Level.platforms`.
