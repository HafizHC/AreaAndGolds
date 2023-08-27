
class Player {

	constructor(x,y,id,name){
		this.x = x;
		this.y = y;
		this.w = 20;
		this.h = 20;

		this.vx = 0;
		this.vy = 0;
		this.speed = 3;

		this.linex = x;
		this.liney = y;
		this.lineHeight = 50;
		this.lineWidth = 10;

		this.angleT = 0;
		this.id = id;

		this.healthy = 100;
		this.alive = true;

		this.healtyTime = 0;
		this.bullttTime = 0;

		this.ammo = 10;

		this.score = 0;
		this.name = name;
	}

	update(){

		if(time/fps - this.healtyTime > 3 && this.healthy<100 ) this.healthy += (time/fps - this.healtyTime)/25;

		if(this.ammo < 10 && time/fps - this.bullttTime > 0.3){
			this.ammo ++;
			this.bullttTime = time/fps;
		}

		if((this.vx == 1 * this.speed || this.vx == -1 * this.speed) && (this.vy == 1 * this.speed || this.vy == -1 * this.speed)){
			this.vx = this.vx/Math.sqrt(2);
			this.vy = this.vy/Math.sqrt(2);
		}

		if(!collsion(this.x+this.vx, this.y, this.w, this.h)){
			this.x = this.x + this.vx;
		}

		if(!collsion(this.x, this.y + this.vy, this.w, this.h)){
			this.y = this.y + this.vy;
		}

		this.healthy < 0 ? this.alive = false:null; 
	}

	collsionArea(area){
		if (area >= 1 || !collsion1(this,{x:cvs.offsetWidth*area/2, y:cvs.offsetHeight*area/2, w:cvs.offsetWidth*(1-area), h:cvs.offsetHeight*(1-area)})) {
			this.healthy-=.5;
			this.healtyTime = time/fps;
		}
	}

	shot(e){
		this.healthy -= e;
		this.healtyTime = time/fps;
	}

	line(){
		//let dx = e.offsetX-(this.x+this.w/2-this.lineWidth/2);
		//let dy = e.offsetY-(this.y+this.h/2-this.lineWidth/2);

		//let lenght = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

		this.angleT = time/fps*360/6;
		//this.angle = {sin: dy/lenght, cos: dx/lenght};
		this.angle = {sin: Math.sin(this.angleT*Math.PI/180), cos: Math.cos(this.angleT*Math.PI/180)};

		this.linex = (this.angle.cos) * this.lineHeight + this.x + this.w/2;
		this.liney = (this.angle.sin) * this.lineHeight + this.y + this.h/2;
		
	}

	newBulletPerm(){
		if(this.ammo>0 && time/fps - this.bullttTime > 0.1){
			this.ammo--;
			return true;
		}else return false;
	}

	newBullet(Id){
		this.healtyTime = time/fps;
		this.bullttTime = time/fps;
		return new bullet(this.x + this.w/2 , this.y + this.h/2, this.angle.sin, this.angle.cos, Id); 
	}

	draw(){

		ctx.strokeStyle = 'rgb(120,150,200)'
		ctx.beginPath();
		ctx.moveTo(this.x + this.w/2, this.y + this.h/2);
		ctx.lineTo(this.linex, this.liney);
		ctx.lineWidth = this.lineWidth;
		ctx.stroke();

		ctx.fillStyle = 'orange';
		ctx.fillRect(this.x, this.y, this.w, this.h);

		let barw = 60;
		let barh = 6; 

		ctx.fillStyle = "rgb(180,180,180)";
		ctx.fillRect(this.x + (this.w - barw)/2, this.y - 6 - barh, barw, barh);
		ctx.fillStyle = "red";
		this.healthy > 0 ? ctx.fillRect(this.x + (this.w - barw)/2 + 2, this.y - 4 - barh, barw*this.healthy/100 - 4, barh - 4):null;

		ctx.fillStyle = "rgb(180,180,180)";
		let distance = 1;
		for(let i = 0;i < this.ammo; i++)
			ctx.fillRect(this.x + (this.w - barw)/2 + ((barw-distance*9)/10+distance)*i, this.y - 9 - 2*barh, (barw-distance*9)/10, barh);
	}

}