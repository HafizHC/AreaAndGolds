var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var gameMode = document.getElementById('ttl').text;

cvs.onmousemove = mouseMove;
cvs.onmousedown = mouseDown;

var mouse = {};
var timer;
var fps = 48;
var time = 0;

var players = [];
var bullets = [];

var unitWh = 30;
var row = cvs.offsetHeight/unitWh;
var collumn = cvs.offsetWidth/unitWh;
var area = 0;

var map = [
			   [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
			   [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
			   [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
			   [0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0],
			   [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
			   [0,0,0,0,1,0,0,1,1,0,0,1,1,0,0,1,0,0,0,0],
			   [0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
			   [1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,1],
			   [0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
			   [0,0,0,0,1,0,0,1,1,0,0,1,1,0,0,1,0,0,0,0],
			   [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
			   [0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0],
			   [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
			   [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
			   [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
			];			

function setup () {
	players[0] = new Player(50,50,players.length);
	players[1] = new Player(530,50,players.length);
	for (var i = 0; i < 2; i++) {
		let name = prompt("Please enter " + (i+1) + ". user name:", "New User");
		if (name == null || name == "" || name == undefined)
			name = "NewUser";
		players[i].name = name;
	}
	timer = setInterval(loop.bind(this), 1000/fps);
	gameMode == 'Golds' ? setupGoldG():null;
}

function loop () {
	keyCont();
	update();
	draw();
	
	for(let i = 0; i < players.length; i++){
		players[i].draw();
	}
	gameMode == 'Golds' ? goldG():areaG();
	

}

function update() {
	time++;

	for(let i = 0; i < players.length; i++){
		if (!players[i].alive) continue;
		players[i].update();
		players[i].line();
	}

	for(let m = 0; m < bullets.length; m++){
		bullets[m].update();
		if (collsion(bullets[m].x + bullets[m].vx, bullets[m].y + bullets[m].vy, bullets[m].w, bullets[m].h)) bullets[m].cllsn = true;
		for(let n = 0; n < players.length; n++){
			if(bullets[m].id == players[n].id || !players[n].alive || bullets[m].cllsn) continue;
			if(collsion1(players[n], bullets[m])){
				players[n].shot(20);
				bullets[m].cllsn = true;
			}
		}
	}
	for(let i = 0; i < bullets.length; i++){
		if(bullets[i].cllsn) bullets.splice(i,1);
	}
}

function areaG(){
	area < 1 ? area+=0.0005:null;

	for(let i = 0;i<players.length;i++){
		players[i].collsionArea(area);
	}
	if (!players[1].alive && !players[0].alive) {
		drawText("Draw",cvs.offsetWidth/2,cvs.offsetHeight/2,40,"center");
		clearInterval(timer);
	}else if(!players[1].alive){
		drawText("Winner " + players[1].name,cvs.offsetWidth/2,cvs.offsetHeight/2,40,"center");
		clearInterval(timer);
	}else if(!players[0].alive){
		drawText("Winner " + players[0].name,cvs.offsetWidth/2,cvs.offsetHeight/2,40,"center");
		clearInterval(timer);
	}
	
	ctx.beginPath();
	ctx.globalAlpha = 0.2;
	ctx.fillStyle="red";
	ctx.fillRect(0,0,cvs.offsetWidth,cvs.offsetHeight*area/2);
	ctx.fillRect(0,cvs.offsetHeight*(1-area/2),cvs.offsetWidth,cvs.offsetHeight*area/2);
	ctx.fillRect(0,cvs.offsetHeight*area/2,cvs.offsetWidth*area/2,cvs.offsetHeight*(1-area));
	ctx.fillRect(cvs.offsetWidth*(1-area/2),cvs.offsetHeight*area/2,cvs.offsetWidth*area/2,cvs.offsetHeight*(1-area));
	ctx.fill();
	ctx.globalAlpha = 1;
}



function setupGoldG(){
	this.golds = [];
	golds[golds.length] = new gold(9+Math.floor(Math.random()*2),7,unitWh);
	this.goldTime = time;
}

function goldG(){

	if(time/fps - goldTime > 7){
		if(time/fps - goldTime > 14){
			if (golds.length==0) {
				newGold();
			}else if (golds[golds.length-1].state) {
				newGold();
			}else golds[golds.length-1].state = true;	
		}
	}

	for(let i = 0;i<golds.length;i++){
		golds[i].draw();
		for(let n = 0;n<players.length;n++){
			if(golds[i].collsion(players[n])){
				golds.splice(i,1);
				players[n].score++;
			} 
		}		
	}

	for(let i = 0; i<players.length;i++){
		if(!players[i].alive){
			let x = Math.floor(Math.random()*(collumn-1));
			let y = Math.floor(Math.random()*(row-1));
			while(map[y][x] == 1){
				x = Math.floor(Math.random()*(collumn-1));
				y = Math.floor(Math.random()*(row-1));
			}
			players[i].x = x*unitWh;
			players[i].y = y*unitWh;
			players[i].alive = true;
			players[i].healthy = 100;
		}
		if(players[i].score >= 5){
			drawText("Winner " + players[i].name,cvs.offsetWidth/2,cvs.offsetHeight/2,40,"center");
			clearInterval(timer);
		}
	}
}

function newGold(){
	let x = Math.floor(Math.random()*(collumn-1));
	let y = Math.floor(Math.random()*(row-1));
	while(map[y][x] == 1){
		x = Math.floor(Math.random()*(collumn-1));
		y = Math.floor(Math.random()*(row-1));
	}
	golds[golds.length] = new gold(x,y,unitWh);
	goldTime = time/fps;
}




function draw() {
	ctx.clearRect(0,0,cvs.offsetWidth,cvs.offsetHeight);
	//ctx.fillStyle = 'rgb(0,0,0)'
	//ctx.fillRect(0,0,cvs.offsetWidth,cvs.offsetHeight);
	for(var i = 0;i < row;i++){
		for(var n = 0;n < collumn;n++){
			map[i][n] == 0 ? ctx.fillStyle = 'rgb(80,130,220)' : ctx.fillStyle = 'rgb(200,180,140)';
			ctx.fillRect(unitWh*n, unitWh*i, unitWh, unitWh);
		}
	}

	for(let i = 0; i < bullets.length; i++){
			bullets[i].draw();
	}

	players[0] != null ? drawText(players[0].name + ": " + players[0].score,20,20,15,"left"):null;
	players[1] != null ? drawText(players[1].name + ": " + players[1].score,cvs.offsetWidth-20,20,15,"right"):null;
}

function collsion1(o1,o2){	
	if (o1.x+o1.w>o2.x&&o1.x<o2.x+o2.w) {
	 	if (o1.y<o2.y+o2.h&&o1.y+o1.h>o2.y) {
	 		return true;
		}else return false;
	}else return false;	
}

function fire(id){
	if (players[id].alive && players[id].newBulletPerm())
		bullets[bullets.length] = players[id].newBullet(id);
}

function mouseMove(e){
	mouse = e;
}

function setMap(){
	let pUnitx = Math.floor(mouse.offsetX/unitWh);
	let pUnity = Math.floor(mouse.offsetY/unitWh);
	if(map[pUnity][pUnitx]==0)
		map[pUnity][pUnitx]=1;
	else map[pUnity][pUnitx] = 0;
	draw();	  
}

//var map = [];
function buildMap(){
	for(let m = 0; m < row; m++){
		map[m] = [];
		for(let n = 0; n < collumn; n++){
			map[m][n] = 0;
		}
	}
}

function mouseDown(e){
	mouse = e;
	//setMap(); //for buildMap
}

window.onload = () => setup();
//window.onload = () => buildMap();
