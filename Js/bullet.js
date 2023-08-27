class bullet {

	constructor(x,y,sin,cos,id){

		this.w = 10;
		this.h = 10;
		this.x = x - this.w/2;
		this.y = y - this.h/2;
		let speed = 4;
		this.vx = cos*speed;
		this.vy = sin*speed;

		this.cllsn = false;
		this.id = id;
	}

	update(){
		this.x += this.vx;
		this.y += this.vy;
	}

	draw(){
		ctx.fillStyle = 'rgb(200,40,80)';
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}


}