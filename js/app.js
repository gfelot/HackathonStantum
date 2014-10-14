//config est GLOBALE !!!
var config = {
	nbElements : 6,
	canvas : {
		id : "my-canvas",
		width : 900,
		height : 600,
		cellWidth : 60,
		cellHeight : 60,
	}
} ;
//900*600
//
//
	var c = document.getElementById(config.canvas.id);
	c.setAttribute('width', config.canvas.width);
	c.setAttribute('height', config.canvas.height);

	var state = new CanvasState(c);

	var ctx = c.getContext("2d");
	
	//on initialise la grille :
	var grid = new Grid(ctx, config.nbElements) ;
	grid.setElementsOnGrid().drawGrid() ;


//var p = new PathManager(6);
//p.setRandomPath() ;
