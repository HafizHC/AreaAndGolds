function collsion(x,y,w,h){

	let pUnitx = Math.floor(x/unitWh);
	let pUnity = Math.floor(y/unitWh);
	let pUnitx1 = Math.floor((x + w)/unitWh);
	let pUnity1 = Math.floor((y + h)/unitWh);

	pUnity < 0 ? pUnity = 0 : null;
	pUnity1 < 0 ? pUnity1 = 0 : null;
	pUnity > map.length-1 ? pUnity = map.length-1 : null;
	pUnity1 > map.length-1 ? pUnity1 = map.length-1 : null;

	if(map[pUnity][pUnitx] == 1 || map[pUnity][pUnitx1] == 1 || map[pUnity1][pUnitx] == 1 || map[pUnity1][pUnitx1] == 1){
		return true;
	}
	if (x<0 || x + w>cvs.offsetWidth || y<0 || y + h>cvs.offsetHeight) {
		return true;
	}

	return false;

}


function drawText(text,x,y,font,position) {
	ctx.fillStyle = 'white';
	ctx.font = font + 'px Arial';
	let tW = ctx.measureText(text).width;
	position == "left" ? ctx.fillText(text, x , y) : (position == "right" ? ctx.fillText(text, x-tW , y) : ctx.fillText(text, x-tW/2 , y));
}
