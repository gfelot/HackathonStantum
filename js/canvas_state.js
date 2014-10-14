
function CanvasState (canvas) {
	
	
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctx = canvas.getContext('2d');

	this.valid = false;
	this.shapes = [];

	var myState = this;

	canvas.addEventListener('click', function(e){
		
		e.preventDefault();
		
		var mouse = myState.getMouse(e);
		var mx = mouse.x;
		var my = mouse.y;
		var shapes = myState.shapes;
		var l = shapes.length;

		console.log(mx);
		// for (var i = l-1; i >= 0; i--) {

		// 	if (shapes[i].contains(mx, my)) {

		// 	var mySel = shapes[i];
		// 	myState.dragoffy = my - mySel.y;
		// 	myState.dragging = true;
		// 	myState.selection = mySel;
		// 	myState.valid = false;
		// 	return;
		// }

	}, true);
}