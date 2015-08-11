var BackgroundSquare = function(fileName, x, y, width, height) {
	this.image = document.createElement("img");
	this.image.src = fileName;
	
	this.position = new Vector2(x, y);
	this.dimensions = new Vector2(width, height);
	this.direction = new Vector2(0, 1);
	this.movementSpeed = 10;
	this.accumulatedTime = Math.random() * 10000;
	this.willBeTransparent = Math.random() > 0.5 ? true : false;
	this.colour = "#" + 
				  Math.floor(Math.random() * 10) + 
			      Math.floor(Math.random() * 10) + 
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10);
}

BackgroundSquare.prototype.update = function(deltaTime) {
	if (this.accumulatedTime > 999999999)
	{
		this.accumulatedTime = Math.random() * 10000;
	}
	this.accumulatedTime += deltaTime;
	var velocity = new Vector2(this.direction.x * this.movementSpeed, this.direction.y * this.movementSpeed);
	velocity.normalise();
	this.position.add(velocity);
	
	if (this.position.y - this.dimensions.y * 0.5 > canvasHeight)
	{
		this.position.y = -this.dimensions.y;
	}
}

BackgroundSquare.prototype.draw = function() {
	context.save();
		context.translate(this.position.x, this.position.y);
		if (this.willBeTransparent)
		{
			context.globalAlpha = Math.sin(this.accumulatedTime) * 0.5 + 0.5;	
		}
		context.fillStyle = this.colour;
		context.fillRect(-this.dimensions.x * 0.5, -this.dimensions.y * 0.5, this.dimensions.x, this.dimensions.y);
	context.restore();
}
