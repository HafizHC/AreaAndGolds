class gold{

	constructor(unitx,unity,unitwh,time){
		this.x = unitx*unitwh;
		this.y = unity*unitwh;
		this.w = unitwh;
		this.h = unitwh;
		this.state = false;
		this.alpha = .5;
		this.alphaB = true;
	}

	collsion(player){
		if(collsion1(this, player) && this.state){
			return true;
		}else return false;
	}

	draw(){
		if (!this.state) {
			if (this.alpha>1) {
				this.alphaB = false;
			}else if (this.alpha<.5) {
				this.alphaB = true;
			}
			if (this.alphaB) {
				this.alpha+=0.01;
			}else this.alpha-=0.01;
		}
		this.state ? ctx.fillStyle = "rgb(80,200,80)":ctx.fillStyle = "rgb(160,200,120)";
		ctx.beginPath();
		ctx.globalAlpha = this.alpha;
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.globalAlpha = 1;	
	}

}