
var config = {
	nbPlayers : 1,
	nbElements : 8,
	linkStyle : "circle",
	canvas : {
		id : "my-canvas",
		width : 900,
		height : 630,
		cellWidth : 90,
		cellHeight : 90,
	},
	path : {
		minLength : 4,
		maxLength : 8,
		drawNumber : true
	},
	theme : 'space',
	useRandom : false
} ;

var playerActive, 
	linkedCells = [];
var usedImages = [] ;



var c = document.getElementById(config.canvas.id);
c.setAttribute('width', config.canvas.width);
c.setAttribute('height', config.canvas.height);
var ctx = c.getContext("2d");

//on initialise la grille :
var grid = new Grid(ctx, config.nbElements) ;
grid.setElementsOnGrid() ;//.drawGrid() ;

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
var ctrlZ = document.getElementById('back') ;

ctrlZ.addEventListener('click', function(){

	if (this.getAttribute('class').indexOf("forbidden") != -1) {
		return false ;
	}
	playerActive.moveBackToCell() ;
}) ;

victoryScreen = document.getElementById('victory')
victoryScreen.addEventListener('click', function(){
	//on recharge :
	window.location = "" ;

});

var u = grid.getUsedCells() ;

var targetElement ;
if (config.useRandom) {
	targetElement = u[ Math.floor(Math.random() * u.length)].e ;
} else {
	targetElement = u[7].e ; //on cible la derniere planete
}
targetElement.setAttribute('class', 'grid-item active target');
// for (var i = 0 ; i < 3 ; i++) {

// 	setTimeout(function(){
// 		targetElement.firstChild.style.width = "70px" ;
// 		setTimeout(function(){
// 			targetElement.firstChild.style.width = "90px"; 
// 		}, 1000)
// 	}, 2000) ;
//}