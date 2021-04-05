 function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 480;
	pen = canvas.getContext('2d');
	cs = 32;
	game_over = false;
	score = 0;

	food_img = new Image();
	food_img.src = "food.jpeg";

	food = getRandomFood();

	snake = {
		init_len:5,
		colour:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i = this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.colour;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1);
			}
		},

		updateSnake:function(){

			var HeadX = this.cells[0].x ;
			var HeadY = this.cells[0].y ;

			if(HeadX==food.x && HeadY==food.y){
				console.log("food eaten");
				food = getRandomFood();
				score++;
			}
			else{
				this.cells.pop();
			}

			var nextX,nextY;

			if(this.direction=="right"){
				nextX = HeadX+1;
				nextY = HeadY;
			}

			else if(this.direction=="left"){
				nextX = HeadX-1;
				nextY = HeadY;
			}

			else if(this.direction=="down"){
				nextX = HeadX;
				nextY = HeadY+1;
			}

			else{
				nextX = HeadX;
				nextY = HeadY-1;
			}

			this.cells.unshift({x:nextX,y:nextY});

			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>=last_x|| this.cells[0].y>=last_y)
			{
				game_over = true;
			}
		}
	};

	snake.createSnake();

	function keyPressed(e){

		if(e.key=="ArrowRight"){
			if(snake.direction!="left"){
				snake.direction = "right";
			}
		}
		else if(e.key=="ArrowLeft"){
			if(snake.direction!="right"){
				snake.direction = "left";
			}
		}
		else if(e.key=="ArrowDown"){
			if(snake.direction!="up"){
				snake.direction = "down";
			}
		}
		else{
			if(snake.direction!="down"){
				snake.direction = "up";
			}
		}
		console.log(snake.direction);
	}

	document.addEventListener('keydown',keyPressed);
}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.fillStyle = food.colour;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.fillStyle = "Blue";
	pen.font = "50px Roboto";
	pen.fillText(score,25,50);
}

function update(){
	snake.updateSnake();

}

function getRandomFood(){
	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		colour:"red",
	}
	return food;
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
	}
	draw();
	update();
}

init();

var f = setInterval(gameloop,125);