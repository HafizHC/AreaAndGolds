
document.addEventListener('keydown', keyDown.bind(this));
document.addEventListener('keyup', keyUp.bind(this));

var key = {37: false, 38: false, 39: false, 40: false, 13: false, 87: false, 68: false, 65: false, 83: false, 32: false};
const keylist = [37,38,39,40,13,87,68,65,83,32];


function keyDown(e){
	key[e.keyCode] = true;
}

function keyUp(e){
	key[e.keyCode] = false;

}

function keyCont(){

	if(key[37] || key[39])
		if (key[37])
			players[1].vx = -players[1].speed;
		else 
			players[1].vx = players[1].speed;
	else players[1].vx = 0;
	if(key[38] || key[40])
		if (key[38])
			players[1].vy = -players[1].speed;
		else 
			players[1].vy = players[1].speed;
	else players[1].vy = 0;
	if (key[13])
		fire (1);
	

	if (key[83] || key[87])
		if (key[87])
			players[0].vy = -players[0].speed;
		else
			players[0].vy = players[0].speed;
	else 
		players[0].vy = 0;
	if (key[68] || key[65])
		if (key[65])
			players[0].vx = -players[0].speed;
		else
			players[0].vx = players[0].speed;
	else 
		players[0].vx = 0;
	if(key[32])
		fire (0);
	
}
