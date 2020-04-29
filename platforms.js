// class for all objects in game
class Platform{
	constructor(x, y, x2, y2 = 25,type="platform", collisionFunction=undefined){
		this.x = x;
		this.y = y;
		this.x2 = x2;
		this.y2 = y2;
		this.center = {x: this.x + (this.x2/2), y: this.y + (this.y2/2)}
		this.type = type;
		this.collisionFunction = collisionFunction;
	}
	// simple method that returns true if this object is touched by the give x, y position
	colliding(x, y){
		if (Math.abs(x - this.center.x) <= (this.x2/2)+10 && Math.abs(y - this.center.y) <= (this.y2/2)+10){
			return true;
		}
		else{
			return false;
		}
	}
}

class CustomPlatform{
	constructor(solid, collisionFunction, runFunction = undefined){
		this.solid = solid;
		this.collisionFunction = collisionFunction;
		this.runFunction = runFunction;
		this.name = "custom";
	}
	createNew(x, y, x2, y2){
		return new Platform(x, y, x2, y2, this.name, this.collisionFunction);
	}
}

class Game{
	constructor(config){
		this.levels = [];
		this.currentLevel = 0;
		this.x;
		this.y;
		this.yVelocity = 0.0;
		this.jumping = false;
		this.collision;
		this.speed = config.moveSpeed;
		this.jumpSpeed = config.jumpSpeed
		this.maxVelocity = config.maxVelocity
		this.jumpCall = false;
	}
	add(level){
		this.levels.push(level)
		this.x = this.levels[this.currentLevel].respawnX;
		this.y = this.levels[this.currentLevel].respawnY;
	}
	jump(){
		this.jumpCall = true;
	}
	reset(){
		this.jumpCall = false;
	}
	kill(){
		this.x = 200;
		this.y = 0;
		this.jumping = true
		this.yVelocity = 0.0
	}
	doCollisions(x, y){
		var platforms = this.levels[this.currentLevel].platforms;
		if (this.jumpCall && !this.jumping && this.yVelocity == 0.0){
			this.jumping = true
			this.yVelocity -= this.jumpSpeed;
		}
		if (y > document.getElementById('canvas').height){
			this.x = this.levels[this.currentLevel].respawnX;
			this.y = this.levels[this.currentLevel].respawnY;
			this.jumping = true
			this.yVelocity = 0.0
		}
		// kill if touching lava
		for (var i = 0; i<platforms.length; i++){
			if (platforms[i].colliding(this.x, this.y) && platforms[i].type == 'lava'){
				this.x = 200;
				this.y = 0;
				this.jumping = true
				this.yVelocity = 0.0
				console.log(platforms[i].type)
			}
		}
		for (var i = 0; i<platforms.length; i++){
			if (platforms[i].colliding(this.x, this.y) && platforms[i].type == 'finish'){
				this.currentLevel ++;
				this.x = this.levels[this.currentLevel].respawnX
				this.y = this.levels[this.currentLevel].respawnY
				this.jumping = true
				this.yVelocity = 0.0
			}
		}

		// check for collision with objects
		var collisions = checkForCollision(x, y)
		// handle collision
		// if not colliding, fall
		if (collisions == 0){
			if (this.yVelocity < this.maxVelocity){
				this.yVelocity += 0.2
			}
		}
		// if we are colliding and we are pressing the left key, check if moving a bit to the right will have us collide with one less thing (basically checking if we're colliding with a wall). If so, get out of the wall and fall.
		else if (keysPressed[37]){
			if (checkForCollision(this.x+this.speed, this.y) < collisions){
				do {
					this.x ++
				} while (checkForCollision(this.x, this.y) == collisions)
				if (this.yVelocity < this.maxVelocity){
					this.yVelocity += 0.2
				}
			}
		}
		// same as above but reversed, to check if we are going at the wall on the opposite direction.
		else if (keysPressed[39]){
			if (checkForCollision(this.x-this.speed, this.y) < collisions){
				do {
					this.x --
				} while (checkForCollision(this.x, this.y) == collisions)
				if (this.yVelocity < this.maxVelocity){
					this.yVelocity += 0.2
				}
			}
		}
		collisions = checkForCollision(this.x, this.y)
		// if we're going up and colliding and going down will make us not collide anymore, we're going through the roof!
		if (this.jumping && this.yVelocity < 0 && collisions > 0){
			if (checkForCollision(this.x, this.y-this.yVelocity) < collisions){
				do{
					this.y ++
				} while (checkForCollision(this.x, this.y) == collisions)
				this.yVelocity = 0.0
			}
		}
		// if we're still colliding with something, it must be the ground, so we should stop and move out of the ground.
		if (checkForCollision(this.x, this.y) > 0){
			do{
				this.y --
			} while (checkForCollision(this.x, this.y) > 0)
			if (!this.jumping){
				this.y ++
			}
			this.yVelocity = 0.0;
			this.jumping = false;
		}
		for (var i = 0; i<platforms.length; i++){
			if (platforms[i].colliding(this.x, this.y) && platforms[i].type == 'custom'){
				platforms[i].collisionFunction();
			}
		}
		game.y += game.yVelocity
	}
	render(canvas){
		var canvasDrawing = canvas.getContext('2d');
		canvasDrawing.clearRect(0,0,1000,1000);
		var platforms = this.levels[this.currentLevel].platforms
		for (var i = 0; i<platforms.length; i++){
			if (platforms[i].type == "lava"){
				canvasDrawing.fillStyle = "red";
			}
			else if (platforms[i].type == "finish"){
				canvasDrawing.fillStyle = "green"
			}
			else{
				canvasDrawing.fillStyle = "black"
			}
			canvasDrawing.fillRect(platforms[i].x, platforms[i].y, platforms[i].x2, platforms[i].y2);
		}
		canvasDrawing.beginPath()
		canvasDrawing.arc(game.x,game.y,10,0*Math.PI,2*Math.PI);
		canvasDrawing.fillStyle = "red";
		canvasDrawing.fill()
	}
}
class Level{
	constructor(x, y){
		this.platforms = [];
		this.respawnX = x;
		this.respawnY = y;
	}
	add(platform){
		this.platforms.push(platform)
	}
}
// loops through all objects and returns the number of Platforms the x, y postion is touching
function checkForCollision(x, y){
	var platforms = game.levels[game.currentLevel].platforms
	var num = 0;
	for (var i = 0; i<platforms.length; i++){
		if (platforms[i].colliding(x, y)){
			num ++;
		}
	}
	return num;
}

//key detection
var keysPressed = {37: false, 38:false, 39:false, 40:false};
document.addEventListener('keydown', function(e) {
	keysPressed[e.keyCode] = true;
}, true);
document.addEventListener('keyup', function(e) {
	keysPressed[e.keyCode] = false;
}, true);
