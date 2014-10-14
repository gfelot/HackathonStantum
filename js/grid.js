/**
* A Grid Generator for placement
*
*
*
*/

function Grid(context, nbElem) {

	this.context = context ;
	this.nbElem = nbElem;
	this.gridWidth = parseInt(config.canvas.width) / parseInt(config.canvas.cellWidth) ;
	this.gridHeight = parseInt(config.canvas.height) / parseInt(config.canvas.cellHeight) ;

	this.grid = matrixGenerator(this.gridWidth, this.gridHeight);
	this.maxDistance = 1 ; //distance entre chaque maison

	this.usedCells = [];


	this.setElementsOnGrid = function() {

		for (var i = 0 ; i < this.nbElem; i++) {
			this.setElementOnGrid();
		}

		return this ;
	}

	this.setElementOnGrid = function() {

		var cellPos = this.defineRandomPosition();
	
		while (!this.isEmptyZone(cellPos[0], cellPos[1])) {
			cellPos = this.setElementOnGrid();
			return false;
		}

		this.grid[cellPos[0]][cellPos[1]] = 1;
		return true;
	}

	this.isEmptyCell = function(x,y) {
	
		return !this.grid[x][y] ;
	}

	this.isEmptyZone = function(x,y) {



		var xMin = x - this.maxDistance > 0 ? x - this.maxDistance : 0;
		var xMax = x + this.maxDistance < (this.gridWidth - 1) ? x + this.maxDistance : (this.gridWidth - 1) ;
		var yMin = y - this.maxDistance > 0 ? y - this.maxDistance : 0;
		var yMax = y + this.maxDistance < (this.gridHeight - 1) ? y + this.maxDistance : (this.gridHeight - 1) ;
	
		for (var i = xMin; i <= xMax; i++) {
			for (var j = yMin; j <= yMax; j++) {
				if (!this.isEmptyCell(i,j)) return false;
			}	
		}

		return true ;
	}

	this.defineRandomPosition = function() {
		//dsl pr ca, je me suis gouré dans la matrice xD
		var y = Math.floor(Math.random() * (this.gridWidth -1)); //entre O et 14
		var x = Math.floor(Math.random() * (this.gridHeight -1)); //entre 0 et 9
		
		return [x,y] ;
	}


	this.drawGrid = function() {

		var imgManager = new ImageManager() ;
		var gridContainer = document.getElementById('grid-container');

		gridContainer.style.width = config.canvas.width + "px" ;
		gridContainer.style.height = config.canvas.height + "px" ;
		
		for (var i = 0, l = this.grid.length ; i < l ; i++) {
			for (var j = 0, k = this.grid[i].length ; j < k ; j++) {

				var gridItem = document.createElement('div') ;
				//var text = document.createTextNode(i+'/'+j);
				//gridItem.appendChild(text);

				if (this.grid[i][j] === 1) {

					//on place les div pour leur associer les écouteurs
					gridItem.setAttribute('class', 'grid-item active');
					this.usedCells.push({
						e : gridItem,
						x : j,
						y : i,
					});
					gridItem.setAttribute('id', 'active-grid-item-'+ (this.usedCells.length - 1));
					var text = document.createTextNode((this.usedCells.length - 1).toString());
					gridItem.appendChild(text);

					var imgPath = imgManager.getRandomImage() ;
					var myImage = new Image();
					myImage.src = imgPath;

					gridItem.appendChild(myImage);
					//on dessine l'image dans le canvas
					// var t = function(i, j){

					// 	var imgPath = imgManager.getRandomImage() ;
					// 	var myImage = new Image();
					// 	myImage.src = imgPath;

					// 	myImage.onload = function() {
					// 		context.drawImage(myImage, i * config.canvas.cellHeight, j * config.canvas.cellWidth);
					// 	}

					// }(i, j) ;

				} else {
					gridItem.setAttribute('class', 'grid-item');
				}

				gridContainer.appendChild(gridItem) ;
			}
		}
	}

	this.getUsedCells = function() {
		return this.usedCells ;
	}

	this.initListeners = function() {

		for (var i = 0; i < this.usedCells.length ; i++) {

			var div = this.usedCells[i].e ;

			div.myData = i ;

			div.addEventListener('click', function(e) {

				playerActive.moveToCell(this) ;

			}, false) ;
		}
	}
}
