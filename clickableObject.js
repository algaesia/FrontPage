var ClickableObject = function(x, y, width, height)
{
	this.highlightedColour = "#" + 
				  Math.floor(Math.random() * 10) + 
			      Math.floor(Math.random() * 10) + 
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10);
	this.unhighlightedColour = "#" + 
				  Math.floor(Math.random() * 10) + 
			      Math.floor(Math.random() * 10) + 
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10) +
				  Math.floor(Math.random() * 10);
	this.currentColour = this.unhighlightedColour;
	
	this.position = new Vector2(x, y);
	this.dimensions = new Vector2(width, height);
	
	this.linkName = "http://www.google.com.au";
	this.displayedName = "Default Name";
	
	this.highlighted = false;
	this.rotation = 0;
	//min = -2 max = 2
	this.maxRotationRate = 2;
	this.minRotationRate = -2;
	this.rotationRate = this.minRotationRate + Math.random() * (this.maxRotationRate - this.minRotationRate);
}

ClickableObject.prototype.update = function(deltaTime) {
	if (this.highlighted) {
		this.currentColour = this.highlightedColour;
	} else {
		this.currentColour = this.unhighlightedColour;
	}	
}

ClickableObject.prototype.draw = function() {
	context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.fillStyle = this.currentColour;
		context.fillRect(-this.dimensions.x * 0.5, -this.dimensions.y * 0.5, this.dimensions.x, this.dimensions.y);
	context.restore();	
	
	context.font = "30px Verdana";
	context.fillStyle = "#47B26B";
	context.fillText(this.displayedName, this.position.x + this.dimensions.x, this.position.y + this.dimensions.y * 0.25);
}

ClickableObject.prototype.withinRange = function(x, y) {
	var mousePos = new Vector2(x, y);
	mousePos.subtract(this.position);
	var dist = mousePos.length();
	if (dist < this.dimensions.x * 0.5) {
		return true;
	}
	return false;
}

ClickableObject.prototype.setLinkName = function(linkName)
{
	this.linkName = linkName;
}

ClickableObject.prototype.setDisplayedName = function(displayedName)
{
	this.displayedName = displayedName;
	context.font = "30px Verdana";
}
