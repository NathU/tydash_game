///////////////// Important Game Variables /////////////////
var player_1 = null;
var player_2 = null;
var wrapping = false;
var game_width = 1000;
var game_height = 540;
var friction = 0.95;
var gravity = 1.0;
var speed = 2.0;


///////////////// Core Game Functions /////////////////
var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = game_width;
		this.canvas.height = game_height;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]); // childNodes[0] means canvas goes at top of page.
		this.frameNo = 0;
		this.interval = setInterval(game_loop, 20); // 20 = 1000(ms/s) / 50(frames/s)
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function startGame() {
	// initialize player 1
	var p1_width = 40;
	var p1_height = 40;
	var p1_mass = 5;
	var p1_start_pos = random_XY(p1_width, p1_height);
	player_1 = new component(p1_start_pos.x, p1_start_pos.y, p1_mass, p1_width, p1_height, "player", "red");
	player_1.sprite = "bulbasaur";
	
	// initialize player 2
	var p2_width = 40;
	var p2_height = 40;
	var p2_mass = 5;
	var p2_start_pos = random_XY(p2_width, p2_height);
	player_2 = new component(p2_start_pos.x, p2_start_pos.y, p2_mass, p2_width, p2_height, "player", "blue");
	player_2.sprite = "charmander";

	myGameArea.start();
}

// component = anything that's drawn on the canvas and/or simply the objects in the game.
function component(x, y, m, w, h, type, color) {
	// physics
	this.x = x;
	this.y= y;
	this.mass= m;
	this.dx = 0;
	this.dy = 0;
	// other info
	this.height = h;
	this.width = w;
	this.radius = null;
	this.color = color;
	this.sprite = null;
	this.name = null;
	this.score = 0;
	this.health = 0;
	this.type = type;
	
	this.update_position = function() {
		this.x += this.dx;
		this.y += this.dy;
	}
	
	this.accelerate = function(dx, dy) {
		this.dx += dx;
		this.dy += dy;
	}
	
	this.draw = function() {
		ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}
		else if (this.sprite != null) {
			var img = document.getElementById(this.sprite);
			ctx.drawImage(img, this.x, this.y);
		}
		else {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	
	this.crash_with = function(otherobj) {
		return !(((this.y + (this.height)) < otherobj.y) || 
					( this.y > (otherobj.y + (otherobj.height))) || 
					((this.x + (this.width)) < otherobj.x) || 
					( this.x > (otherobj.x + (otherobj.width))));
	}
}

// this is where we implement the rules of the game
function game_loop() {
	
	// do rules (check for collisions, handle scores, etc.)
	
	
	// do math (apply wall/wrapping, gravity, & friction here)
	
	
	// update stuff
	myGameArea.clear();
	myGameArea.frameNo += 1;
	
	player_1.update_position();
	player_2.update_position();
	
	// draw newly updated stuff
	player_1.draw();
	player_2.draw();

}

function handle_keyPress(event) {
	/* 
		In this example, we use a cross-browser solution, because the keyCode property does not 
		work on the onkeypress event in Firefox. However, the which property does.
		Explanation of the first line in the function below: if the browser supports event.which, 
		then use event.which, otherwise use event.keyCode 
	*/
	
	var key_value = event.which || event.keyCode;
	
	// Player 1 (wasd)
	if (key_value == 119 /*w - Up */) {
		player_1.accelerate(0, speed * -1);
	}
	else if (key_value == 97 /*a - Left */) {
		player_1.accelerate(speed * -1, 0);
	}
	else if (key_value == 115 /*s - Down*/) {
		player_1.accelerate(0, speed);
	}
	else if (key_value == 100 /*d - Right*/) {
		player_1.accelerate(speed, 0);
	}
	
	// Player 2 (ijkl)
	else if (key_value == 105 /*i - Up */) {
		player_2.accelerate(0, speed * -1);
	}
	else if (key_value == 106 /*j - Left */) {
		player_2.accelerate(speed * -1, 0);
	}
	else if (key_value == 107 /*k - Down*/) {
		player_2.accelerate(0, speed);
	}
	else if (key_value == 108 /*l - Right*/) {
		player_2.accelerate(speed, 0);
	}
	
}



//////////////// Helper Functions //////////////////
function random_XY(object_width, object_height) { 
	var coordinates = {
		x : Math.floor(Math.random() * (game_width - object_width)),
		y : Math.floor(Math.random() * (game_height - object_height))
	};
	return coordinates;
}
