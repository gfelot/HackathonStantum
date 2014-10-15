
var config = {
	nbPlayers : 1,
	nbElements : 8,
	linkStyle : "line",
	canvas : {
		id : "my-canvas",
		width : 900,
		height : 600,
		cellWidth : 90,
		cellHeight : 90,
	},
	path : {
		minLength : 4,
		maxLength : 10,
	},
	theme : 'space'
} ;

var playerActive, 
	linkedCells = [];

var c = document.getElementById(config.canvas.id);
c.setAttribute('width', config.canvas.width);
c.setAttribute('height', config.canvas.height);
var ctx = c.getContext("2d");

//on initialise la grille :
var grid = new Grid(ctx, config.nbElements) ;
grid.setElementsOnGrid().drawGrid() ;

var myPathManager = new PathManager(config.nbElements);
myPathManager.setRandomPath() ;

//initialisation des joueurs :
var players = [] ;
var player ;
for (var i = 0; i < config.nbPlayers ; i ++) {
	player = new Movable(i) ;
	player.init();
	players.push(player);
}

var playerActive = players[0] ;
grid.initListeners() ;


//init interface : 
var ctrlZ = document.getElementById('erase') ;

ctrlZ.addEventListener('click', function(){
	playerActive.moveBackToCell() ;
}) ;
